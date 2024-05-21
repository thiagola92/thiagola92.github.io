---
authors: thiagola92
tags: [authentication, auth, python, user, username, password, duckdb, starlette]
---

# Authentication - username & password
Username com password é uma das maneiras mais velhas de se criar autenticação no seu sistema.  

No lado do server utilizaremos:
- [DuckDB](https://duckdb.org/) como banco de dados
- [Starlette](https://www.starlette.io/) como RESTful API

No lado do client utilizaremos:
- [httpx](https://www.python-httpx.org/) para fazer requisições

Essa maneira de autenticação envolve armazenar no banco o **hash** da senha e o **salt** utilizado durante o hash.  

- Hash
    - Formalmente conhecido como digest, é o resultado de obtido ao se passar um array de bytes à uma função hash  
- Salt
    - Array de bytes gerado randomicamente para ser usado durante a função hash  

## Questions

> Por que não salvar a senha direto no banco de dados?

Pois se alguém olhar o banco, vai conseguir todas as senhas dos seus usuários.  

> O que é função hash?

Uma função que dada uma entrada de bytes, sempre produz a mesma saída de bytes.  

```
funcao("senha_secreta") => "2c005c01d9b373a068941949669ccfb69ef1b4a0315b10313185761803e05e69"
```

Se você tiver uma a saída de bytes, **não** temos algoritmo para descobrir qual foi a entrada de bytes.  
```
funcao(???) <= "f00c15643396616a89a0cb79039f740575defe9dbe307cccdaf8ae210e1c9cc6"
```

> O que acontece se alguém conseguir acesso ao banco de dados neste caso?

A pessoa vai ter acesso a todos os hash, mas não vai ter a senha então não vai conseguir acessar a conta.  

> Como vamos saber se o usuário acertou a senha se não sabemos a senha?

Iremos comparar o hash da senha que o usuário nos der.  

Se no banco nos temos o hash `fn54978fn435u9gnweru` e o usuário nos der uma senha que gere esse hash, então ele sabe a senha certa.  

> Por que a função hash usa salt?

Se duas pessoas tiverem a mesma senha e jogarem na função hash, o resultado será o mesmo.  
```
usuário 1 => senha_secreta => "2c005c01d9b373a068941949669ccfb69ef1b4a0315b10313185761803e05e69"
usuário 2 => senha_secreta => "2c005c01d9b373a068941949669ccfb69ef1b4a0315b10313185761803e05e69"
```

Se gerarmos algo aleatório para adicionar na entrada da função hash, o resultado muda completamente.  
```
usuário 1 => uejfisenha_secreta => "1c131f765a97e3bcf5101cd3e9e269e552716ad30be97e54f852e4f78ed90e44"
usuário 2 => 2ncWQsenha_secreta => "81feed1d27d67d6da5ebfa18ce58255d2822d95d286161fa3e42e323415d8263"
```

Agora ninguém sabe que os dois usuários tem a mesma senha, porém vamos precisar salvar o salt para reproduzir o resultado.  

## Server
Script para preparar o diretório dos exemplos:  
```shell
mkdir server
cd server
python3 -m venv venv
. venv/bin/activate
pip install duckdb starlette uvicorn
touch main.py auth.py database.py
```

### Server - Database Operations
Faremos apenas 3 operações no nosso banco de dados durante este post:
- Preparar o banco
    - Não é boa prática fazer isto por código, estamos fazendo para ter um projeto com tudo incluso
- Pegar autenticação do usuário
- Criar usuário

```python title="database.py"
import duckdb


def setup():
    cursor = duckdb.connect("users.db")

    cursor.execute("""
        CREATE SEQUENCE IF NOT EXISTS user_id_sequence START 1
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id      integer     primary key     default nextval('user_id_sequence'),
            user    text        not null        unique,
            salt    text        not null,
            hash    text        not null
        )
    """)


def get_user_auth(user: str) -> tuple[str, str]:
    cursor = duckdb.connect("users.db")
    result = cursor.execute(
        "SELECT salt, hash FROM users WHERE user = $user",
        {"user": user},
    ).fetchone()

    if result:
        return (result[0], result[1])
    return ("", "")


def create_user(user: str, salt: str, hash: str) -> bool:
    cursor = duckdb.connect("users.db")
    cursor.execute(
        """
        INSERT INTO users (user, salt, hash) VALUES
        ($user, $salt, $hash)
        """,
        {"user": user, "salt": salt, "hash": hash},
    )
```

### Server - Authentication
Código que sempre ira rodar para validar a autenticação do usuário em páginas que precisam de autenticação.  

Na framework Starlette isso pode ser feito dentro de um Middleware.  

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

        # Extract username and password from credentials
        credentials = base64.b64decode(credentials)
        credentials = credentials.decode()
        username, _, password = credentials.partition(":")

        # Get real hash from database
        salt, hash = get_user_auth(username)
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

        return AuthCredentials(["authenticated"]), SimpleUser(username)
```

Note que `hashlib.scrypt()` retorna bytes e que eles podem não ser conversiveis para utf-8, ascii, etc...  

Então para facilitar a comparação, convertemos para uma string hexadecimal e armazenamos desta maneira.  

### Server - Main
Criamos 2 endpoints:
- Registrar usuário
- Acessar um conteúdo exclusivo para usuários

```python title="main.py"
import os
import hashlib
import binascii
from urllib.parse import parse_qs

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
    fields = parse_qs(body)

    # Body must have username and password
    if "username" not in fields or "password" not in fields:
        return PlainTextResponse("Missing username or password", 400)

    # Get username and password
    username = fields["username"][0]
    password = fields["password"][0]

    # Found user with this username
    if database.get_user_auth(username)[0]:
        return PlainTextResponse("User already exist", 403)

    # Create salt and password hash
    salt = os.urandom(16)
    password = password.encode()
    hash = hashlib.scrypt(password, salt=salt, n=2, r=64, p=1)
    salt = binascii.b2a_hex(salt)
    hash = binascii.b2a_hex(hash)

    database.create_user(username, salt, hash)

    return PlainTextResponse("User created")


# Needs to be authenticated to receive this response
@requires("authenticated")
async def content(request: Request):
    return PlainTextResponse("Private content")


database.setup()

app = Starlette(
    debug=True,
    routes=[Route("/", content), Route("/register", register, methods=["post"])],
    middleware=[Middleware(AuthenticationMiddleware, backend=AuthBackend())],
)
```

Agora você pode iniciar o server com:
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
touch content.py register.py
```

### Client - Access Content
A convenção para se enviar usuário e senha é:  
- Concatenar usuário e senha com `:`
    - `username:password`  
- Transformar em base64
    - `dXNlcm5hbWU6cGFzc3dvcmQ=`
- Escrever antes o scheme utilizado
    - `Basic dXNlcm5hbWU6cGFzc3dvcmQ=`
- Enviar no campo `Authorization` do headers

```python title="content.py"
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
python content.py username password
```

Se você ainda não escreveu o código de registar, isto deve estar proibindo você de ver o conteúdo da página.  

### Client - Register User
No caso de registrar, o campo `Content-Type` no headers deve conter `application/x-www-form-urlencoded`.  

Enquanto a convenção do body é:
- Concatenar nome do campo e a informação do campo com `=`
    - `username=USERNAME`
- Concatenar todos os grupos de informação com `&`
    - `username=USERNAME&password=PASSWORD`
- Enviar no body do request

```python title='register.py'
import sys
import httpx
from urllib.parse import urlencode

# Get username and password from command line
username = sys.argv[1]
password = sys.argv[2]

# Setup body string
body = urlencode({"username": username, "password": password})

# Register user
response = httpx.post(
    "http://127.0.0.1:8000/register",
    headers={"Content-Type": "application/x-www-form-urlencoded"},
    content=body,
)
print(response.content)
```

Execute o código para registar o usuário e senha:  
```
python register.py username password
```

Agora se executar novamente o código de pegar conteúdo, deve conseguir ler o conteúdo da página.  
```
python content.py username password
```

## References
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type