---
authors: thiagola92
tags: [authentication, auth, python, email, mail, password, duckdb, starlette, aiosmtpd]
---

# Authentication - email & password
No post anterior vimos como fazer [authenticação com usuário e senha](./../2024-05-08-auth-username-password/index.md).  
Agora vamos ver com email e senha, basicamente igual ao outro porém email é o identificador da conta.  

Precisaremos de um servidor de email para receber email:
- [aiosmtpd](https://aiosmtpd.aio-libs.org/en/latest/)

No lado do server utilizaremos:
- [DuckDB](https://duckdb.org/) como banco de dados
- [Starlette](https://www.starlette.io/) como RESTful API

No lado do client utilizaremos:
- [httpx](https://www.python-httpx.org/) para fazer requisições

## Questions

> Qual a vantagem de ter o email como identificador?

Uma segunda maneira de confirmar autenticação.  

Para alguém acessar a conta, ela tem que provar que sabe a senha (vulgo botar a senha na hora de logar).  
Agora podemos cobrar que ela prove ser a dona da email (mandamos uma mensagem para o email dela e ela diz para a gente o conteúdo do email).  

Em outras palavras, se uma pessoa tem a senha e tem acesso ao email que criou a conta, então ela é a dona da conta.  

> Como que falar o conteúdo do email vai provar algo?

Vamos dizer que a pessoa pede para mudar a senha da conta.  
- Nós mandamos um email com um código especial e aleatório para ao email dela
- Ela acessa o email e pega o código (por exemplo: `982jd8fsj83`)
- A pessoa manda o código para o site e a senha nova
- Nós conferimos se o código que a pessoa nos mandou era o que esperavamos, se for mudamos a senha

Essa é apenas uma maneira de implementar isto, outra maneira mais conhecida é:
- Enviamos um email com uma URL do site gerada aleatóriamente
- Usuário acessa o URL
- Levamos o usuário para a área de trocar a senha
    - Pois a pessoa provou que ela entrou no email e conseguiu o URL único
    - Nesse caso podemos também fazer verificação se ela estava logada na conta que esperava esse URL

Iremos pela primeira maneira.  

> O que ganhamos com isso?

O famoso botão "recupere sua senha".  

## Email server
Para não termos que configurar o seu provedor de email ou criar um código onde você passa credenciais reais do seu provedor, vamos levantar um na própria máquina.  

Script para preparar o diretório do provedor de email:  
```shell
mkdir email_server
cd email_server
python3 -m venv venv
. venv/bin/activate
pip install aiosmtpd
```

Para ligar o provedor de email:  
```
python -m aiosmtpd -n
```

## Server
Script para preparar o diretório dos exemplos:  
```shell
mkdir server
cd server
python3 -m venv venv
. venv/bin/activate
pip install duckdb starlette uvicorn pytz
touch main.py auth.py database.py
```

### Server - Database Operations
Alteraremos as operações do post anterior para usarem email em vez de usuário.  

E adicionaremos 4 operações ao banco no nosso código:  
- Criar código de recuperação de conta
- Validar o código de recuperação
    - Isso inclui ver se o usuário está passando o código dentro de um tempo limite
- Remover código de recuperação
- Alterar senha

```python title="database.py"
from datetime import datetime, timedelta

import duckdb


def setup():
    cursor = duckdb.connect("users.db")

    cursor.execute("""
        CREATE SEQUENCE IF NOT EXISTS user_id_sequence START 1
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id      integer     primary key     default nextval('user_id_sequence'),
            email   text        not null        unique,
            salt    text        not null,
            hash    text        not null
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recovery_codes (
            email   text        primary key     not null,
            code    text        not null,
            time    timestamp
        )
    """)


def get_user_auth(email: str) -> tuple[str, str]:
    cursor = duckdb.connect("users.db")
    result = cursor.execute(
        "SELECT salt, hash FROM users WHERE email = $email",
        {"email": email},
    ).fetchone()

    if result:
        return (result[0], result[1])
    return ("", "")


def create_user(email: str, salt: str, hash: str) -> bool:
    cursor = duckdb.connect("users.db")
    cursor.execute(
        """
        INSERT INTO users (email, salt, hash) VALUES
            ($email, $salt, $hash)
        """,
        {"email": email, "salt": salt, "hash": hash},
    )


def create_recovery_code(email: str, code: str):
    cursor = duckdb.connect("users.db")
    cursor.execute(
        """
        INSERT INTO recovery_codes (email, code, time) VALUES
            ($email, $code, current_timestamp)
        ON CONFLICT (email) DO UPDATE
            SET code = EXCLUDED.code
        """,
        {"email": email, "code": code},
    )


def is_recovery_code_valid(email: str, code: str) -> bool:
    cursor = duckdb.connect("users.db")
    result = cursor.execute(
        """
        SELECT email, code, time, current_timestamp
        FROM recovery_codes
        WHERE email = $email AND code = $code
        """,
        {"email": email, "code": code},
    ).fetchone()

    if not result:
        return False

    created: datetime = result[2]
    now: datetime = result[3]
    now = now.replace(tzinfo=None)
    diff: timedelta = created - now

    # Válido por uma hora
    if diff.total_seconds() > 3600:
        return False

    return True


def delete_recovery_code(email: str):
    cursor = duckdb.connect("users.db")
    cursor.execute(
        """
        DELETE FROM recovery_codes WHERE email = $email
        """,
        {"email": email},
    )


def change_account(email: str, salt: str, hash: str):
    cursor = duckdb.connect("users.db")
    cursor.execute(
        """
        UPDATE users
        SET salt = $salt,
            hash = $hash
        WHERE email = $email
        """,
        {"email": email, "salt": salt, "hash": hash},
    )
```

### Server - Authentication
Igual post anterior porém trocamos usuário por email.  

```python title="auth.py"
import base64
import hashlib
import binascii

from starlette.authentication import (
    AuthenticationBackend,
    AuthenticationError,
    AuthCredentials,
    SimpleUser,
)
from starlette.requests import HTTPConnection

from database import get_user_auth


class AuthBackend(AuthenticationBackend):
    async def authenticate(self, conn: HTTPConnection):
        # No authroization, no access
        if "Authorization" not in conn.headers:
            return

        auth = conn.headers["Authorization"]
        scheme, credentials = auth.split()

        # Wrong authorization scheme
        if scheme.lower() != "basic":
            return

        # Extract email and password from credentials
        credentials = base64.b64decode(credentials)
        credentials = credentials.decode()
        email, _, password = credentials.partition(":")

        # Get real hash from database
        salt, hash = get_user_auth(email)
        if not salt or not hash:
            raise AuthenticationError("Invalid credentails")

        # Generate guess of hash
        password = password.encode()
        salt = binascii.a2b_hex(salt)
        guess = hashlib.scrypt(password, salt=salt, n=2, r=64, p=1)
        guess = binascii.b2a_hex(guess)
        guess = guess.decode()

        # Check if the hash guess is the same as real hash
        if hash != guess:
            raise AuthenticationError("Wrong password")

        return AuthCredentials(["authenticated"]), SimpleUser(email)
```

### Server - Main
Trocamos usuário por email e adicionamos dois 2 endpoints novos:  
- Pedir o código de recuperação
- Mudar a senha da conta

```python title="main.py"
import os
import hashlib
import binascii
import secrets
import smtplib
from email.message import EmailMessage

from starlette.applications import Starlette
from starlette.responses import PlainTextResponse
from starlette.requests import Request
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.authentication import requires

import database
from auth import AuthBackend


async def register(request: Request):
    # Refuse if not in the right format
    if request.headers.get("Content-Type") != "application/x-www-form-urlencoded":
        return PlainTextResponse("Invalid body format", 400)

    # Break down body
    body = await request.body()
    body = body.decode()
    parts = body.split("&")
    parts = [part.partition("=") for part in parts]

    # Get email and password
    email = ""
    password = ""
    for part in parts:
        if part[0] == "email":
            email = part[2]
        elif part[0] == "password":
            password = part[2]

    if not email or not password:
        return PlainTextResponse("Missing email or password", 400)

    # Found user with this email
    if database.get_user_auth(email)[0]:
        return PlainTextResponse("User already exist", 403)

    # Create salt and password hash
    salt = os.urandom(16)
    password = password.encode()
    hash = hashlib.scrypt(password, salt=salt, n=2, r=64, p=1)
    salt = binascii.b2a_hex(salt)
    hash = binascii.b2a_hex(hash)

    database.create_user(email, salt, hash)

    return PlainTextResponse("User created")


async def recover_account(request: Request):
    # Get email in body
    email = await request.body()
    email = email.decode()

    # Didn't find user with this email
    if not database.get_user_auth(email)[0]:
        return PlainTextResponse("No account with this email", 403)

    # Create recovery code
    code = secrets.token_urlsafe(32)

    # Save to database, so we can check it later
    database.create_recovery_code(email, code)

    # Create email
    message = EmailMessage()
    message["Subject"] = "Recover account"
    message["From"] = "server@localhost"
    message["To"] = email
    message["Content"] = code

    # Send email
    s = smtplib.SMTP("localhost", 8025)
    s.send_message(message)
    s.quit()

    return PlainTextResponse("Recovery code sent to your email")


async def change_account(request: Request):
    # Break down body
    body = await request.body()
    body = body.decode()
    parts = body.split("&")
    parts = [part.partition("=") for part in parts]

    # Get email, recovery code and new password
    email = ""
    code = ""
    password = ""
    for part in parts:
        if part[0] == "email":
            email = part[2]
        elif part[0] == "code":
            code = part[2]
        elif part[0] == "password":
            password = part[2]

    if not email or not code or not password:
        return PlainTextResponse("Missing email/code/password", 400)

    if not database.is_recovery_code_valid(email, code):
        return PlainTextResponse("Invalid code", 403)

    # Create salt and new password hash
    salt = os.urandom(16)
    password = password.encode()
    hash = hashlib.scrypt(password, salt=salt, n=2, r=64, p=1)
    salt = binascii.b2a_hex(salt)
    hash = binascii.b2a_hex(hash)

    # Change password and remove recovery code
    database.change_account(email, salt, hash)
    database.delete_recovery_code(email)

    return PlainTextResponse("Password changed")


# Needs to be authenticated to receive this response
@requires("authenticated")
async def content(request: Request):
    return PlainTextResponse("Private content")


database.setup()

app = Starlette(
    debug=True,
    routes=[
        Route("/", content),
        Route("/register", register, methods=["post"]),
        Route("/recover_account", recover_account, methods=["post"]),
        Route("/change_account", change_account, methods=["post"]),
    ],
    middleware=[Middleware(AuthenticationMiddleware, backend=AuthBackend())],
)
```

Agora podemos iniciar o server com:
```
uvicorn --reload main:app
```

## Client
Script para preparar o diretório dos exemplos:  
```shell
mkdir client
cd client
python3 -m venv venv
. venv/bin/activate
pip install httpx
touch content.py register.py recover_account.py change_account.py
```

### Client - Access Content
Mesmo que o post anterior porém trocando usuário por email.  

```python title='content.py'
import sys
import httpx
import base64

# Get username and password from command line
username = sys.argv[1]
password = sys.argv[2]

# Setup credentials string
credentials = f"{username}:{password}"
credentials = credentials.encode()
credentials = base64.b64encode(credentials)
credentials = credentials.decode()

# Get content
response = httpx.get("http://127.0.0.1:8000/", headers={"Authorization": f"Basic {credentials}"})
print(response.content)
```

Execute o código para testar obter o conteúdo do sistema:  
```
python content.py username@email.com password
```

Se você ainda não escreveu o código de registar, isto deve estar proibindo você de ver o conteúdo da página.

### Client - Register User
Mesmo que o post anterior porém trocando usuário por email.  

```python title='register.py'
import sys
import httpx

# Get username and password from command line
email = sys.argv[1]
password = sys.argv[2]

# Setup body string
body = f"email={email}&password={password}"

# Register user
response = httpx.post(
    "http://127.0.0.1:8000/register",
    headers={"Content-Type": "application/x-www-form-urlencoded"},
    content=body,
)
print(response.content)
```

Execute o código para registar seu email e senha:  
```
python register.py username@email.com password
```

Agora se executar novamente o código de pegar conteúdo, deve conseguir ler o conteúdo da página.  
```
python content.py username@email.com password
```

### Client - Recover Account
Nosso endpoint de requisitar senha só precisa do email, então esse código é o mais curto que veremos.  

```python title='recover_account.py'
import sys
import httpx

# Get email from command line
email = sys.argv[1]
content = f"{email}"

# Request recovery code
response = httpx.post("http://127.0.0.1:8000/recover_account", content=content)
print(response.content)
```

Execute o código para requisitar um email com o código de recuperação:  
```
python recover_account.py username@email.com
```

Olhe no terminal que está executando o server de email, nele você deve receber um email com o código.  

### Client - Change Account
Agora podemos cobrar do usuário o código de recuperação ao mesmo tempo que a nova senha.  

```python title='change_account.py'
import sys
import httpx

# Get username, code and new password from command line
email = sys.argv[1]
code = sys.argv[2]
password = sys.argv[3]

# Setup body string
body = f"email={email}&code={code}&password={password}"

# Change account password
response = httpx.post("http://127.0.0.1:8000/change_account", content=body)
print(response.content)
```

Após receber o código, execute este código para trocar a senha e lembre de informar o código de recuperação visto no servidor de email:  
```
python change_account.py username@email.com fasdfasfasdfasdf new_password
```

Tente acessar o conteúdo da página com a senha velha e veja falhar.  
```
python content.py username@email.com password
```

Tente acessar o conteúdo da página com a senha nova e veja o conteúdo privido.  
```
python content.py username@email.com new_password
```