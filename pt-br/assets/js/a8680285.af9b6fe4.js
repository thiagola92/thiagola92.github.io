"use strict";(self.webpackChunkthiagola_92_github_io=self.webpackChunkthiagola_92_github_io||[]).push([[7523],{60997:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>i,toc:()=>c});var r=s(85893),a=s(11151);const t={authors:"thiagola92",tags:["authentication","auth","python","user","username","password","duckdb","starlette"]},o="Authentication - username & password",i={permalink:"/pt-br/blog/2024/05/08/auth-username-password",editUrl:"https://github.com/thiagola92/thiagola92.github.io/tree/master/blog/2024-05-08-auth-username-password/index.md",source:"@site/blog/2024-05-08-auth-username-password/index.md",title:"Authentication - username & password",description:"Username com password \xe9 uma das maneiras mais velhas de se criar autentica\xe7\xe3o no seu sistema.",date:"2024-05-08T00:00:00.000Z",formattedDate:"8 de maio de 2024",tags:[{label:"authentication",permalink:"/pt-br/blog/tags/authentication"},{label:"auth",permalink:"/pt-br/blog/tags/auth"},{label:"python",permalink:"/pt-br/blog/tags/python"},{label:"user",permalink:"/pt-br/blog/tags/user"},{label:"username",permalink:"/pt-br/blog/tags/username"},{label:"password",permalink:"/pt-br/blog/tags/password"},{label:"duckdb",permalink:"/pt-br/blog/tags/duckdb"},{label:"starlette",permalink:"/pt-br/blog/tags/starlette"}],hasTruncateMarker:!1,authors:[{name:"Thiago Lages de Alencar",title:"Desenvolvedor de Software",url:"https://github.com/thiagola92",imageURL:"/img/dino.svg",key:"thiagola92"}],frontMatter:{authors:"thiagola92",tags:["authentication","auth","python","user","username","password","duckdb","starlette"]},unlisted:!1,prevItem:{title:"Authentication - email & password",permalink:"/pt-br/blog/2024/05/11/auth-email-password"},nextItem:{title:"TTY, Terminal, Shell, CLI, TUI, GUI",permalink:"/pt-br/blog/2024/04/20/tty-terminal-shell-cli-tui-gui"}},d={authorsImageUrls:[void 0]},c=[{value:"Questions",id:"questions",level:2},{value:"Server",id:"server",level:2},{value:"Server - Database Operations",id:"server---database-operations",level:3},{value:"Server - Authentication",id:"server---authentication",level:3},{value:"Server - Main",id:"server---main",level:3},{value:"Client",id:"client",level:2},{value:"Client - Access Content",id:"client---access-content",level:3},{value:"Client - Register User",id:"client---register-user",level:3},{value:"References",id:"references",level:2}];function l(e){const n={a:"a",blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Username com password \xe9 uma das maneiras mais velhas de se criar autentica\xe7\xe3o no seu sistema."}),"\n",(0,r.jsx)(n.p,{children:"No lado do server utilizaremos:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://duckdb.org/",children:"DuckDB"})," como banco de dados"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://www.starlette.io/",children:"Starlette"})," como RESTful API"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"No lado do client utilizaremos:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://www.python-httpx.org/",children:"httpx"})," para fazer requisi\xe7\xf5es"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Essa maneira de autentica\xe7\xe3o envolve armazenar no banco o ",(0,r.jsx)(n.strong,{children:"hash"})," da senha e o ",(0,r.jsx)(n.strong,{children:"salt"})," utilizado durante o hash."]}),"\n",(0,r.jsxs)(n.p,{children:["Hash, formalmente conhecido como digest, \xe9 o resultado de obtido ao se passar um array de bytes \xe0 uma fun\xe7\xe3o hash.",(0,r.jsx)(n.br,{}),"\n","Salt, um array de bytes gerado randomicamente para ser usado durante a fun\xe7\xe3o hash."]}),"\n",(0,r.jsx)(n.h2,{id:"questions",children:"Questions"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Por que n\xe3o salvar a senha direto no banco de dados?"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Pois se algu\xe9m olhar o banco, vai conseguir todas as senhas dos seus usu\xe1rios."}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"O que \xe9 fun\xe7\xe3o hash?"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Uma fun\xe7\xe3o que dada uma entrada de bytes, sempre produz a mesma sa\xedda de bytes."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'funcao("senha_secreta") => "2c005c01d9b373a068941949669ccfb69ef1b4a0315b10313185761803e05e69"\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Se voc\xea tiver uma a sa\xedda de bytes, ",(0,r.jsx)(n.strong,{children:"n\xe3o"})," temos algoritmo para descobrir qual foi a entrada de bytes."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'funcao(???) <= "f00c15643396616a89a0cb79039f740575defe9dbe307cccdaf8ae210e1c9cc6"\n'})}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"O que acontece se algu\xe9m conseguir acesso ao banco de dados neste caso?"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"A pessoa vai ter acesso a todos os hash, mas n\xe3o vai ter a senha ent\xe3o n\xe3o vai conseguir acessar a conta."}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Como vamos saber se o usu\xe1rio acertou a senha se n\xe3o sabemos a senha?"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Iremos comparar o hash da senha que o usu\xe1rio nos der."}),"\n",(0,r.jsxs)(n.p,{children:["Se no banco nos temos o hash ",(0,r.jsx)(n.code,{children:"fn54978fn435u9gnweru"})," e o usu\xe1rio nos der uma senha que gere esse hash, ent\xe3o ele sabe a senha certa."]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Por que a fun\xe7\xe3o hash usa salt?"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Se duas pessoas tiverem a mesma senha e jogarem na fun\xe7\xe3o hash, o resultado ser\xe1 o mesmo."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'usu\xe1rio 1 => senha_secreta => "2c005c01d9b373a068941949669ccfb69ef1b4a0315b10313185761803e05e69"\nusu\xe1rio 2 => senha_secreta => "2c005c01d9b373a068941949669ccfb69ef1b4a0315b10313185761803e05e69"\n'})}),"\n",(0,r.jsx)(n.p,{children:"Se gerarmos algo aleat\xf3rio para adicionar na entrada da fun\xe7\xe3o hash, o resultado muda completamente."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'usu\xe1rio 1 => uejfisenha_secreta => "1c131f765a97e3bcf5101cd3e9e269e552716ad30be97e54f852e4f78ed90e44"\nusu\xe1rio 2 => 2ncWQsenha_secreta => "81feed1d27d67d6da5ebfa18ce58255d2822d95d286161fa3e42e323415d8263"\n'})}),"\n",(0,r.jsx)(n.p,{children:"Agora ningu\xe9m sabe que os dois usu\xe1rios tem a mesma senha, por\xe9m vamos precisar salvar o salt para reproduzir o resultado."}),"\n",(0,r.jsx)(n.h2,{id:"server",children:"Server"}),"\n",(0,r.jsx)(n.p,{children:"Script para preparar o diret\xf3rio dos exemplos:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"mkdir server\ncd server\npython3 -m venv venv\n. venv/bin/activate\npip install duckdb starlette uvicorn\ntouch main.py auth.py database.py\n"})}),"\n",(0,r.jsx)(n.h3,{id:"server---database-operations",children:"Server - Database Operations"}),"\n",(0,r.jsx)(n.p,{children:"Faremos apenas 3 opera\xe7\xf5es no nosso banco de dados durante este post:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Preparar o banco","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"N\xe3o \xe9 boa pr\xe1tica fazer isto por c\xf3digo, estamos fazendo para ter um projeto com tudo incluso"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"Pegar autentica\xe7\xe3o do usu\xe1rio"}),"\n",(0,r.jsx)(n.li,{children:"Criar usu\xe1rio"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:'title="database.py"',children:'import duckdb\n\n\ndef setup():\n    cursor = duckdb.connect("users.db")\n\n    cursor.execute("""\n        CREATE SEQUENCE IF NOT EXISTS user_id_sequence START 1\n    """)\n\n    cursor.execute("""\n        CREATE TABLE IF NOT EXISTS users (\n            id      integer     primary key     default nextval(\'user_id_sequence\'),\n            user    text        not null        unique,\n            salt    text        not null,\n            hash    text        not null\n        )\n    """)\n\n\ndef get_user_auth(user: str) -> tuple[str, str]:\n    cursor = duckdb.connect("users.db")\n    result = cursor.execute(\n        "SELECT salt, hash FROM users WHERE user = $user",\n        {"user": user},\n    ).fetchone()\n\n    if result:\n        return (result[0], result[1])\n    return ("", "")\n\n\ndef create_user(user: str, salt: str, hash: str) -> bool:\n    cursor = duckdb.connect("users.db")\n    cursor.execute(\n        """\n        INSERT INTO users (user, salt, hash) VALUES\n        ($user, $salt, $hash)\n        """,\n        {"user": user, "salt": salt, "hash": hash},\n    )\n'})}),"\n",(0,r.jsx)(n.h3,{id:"server---authentication",children:"Server - Authentication"}),"\n",(0,r.jsx)(n.p,{children:"C\xf3digo que sempre ira rodar para validar a autentica\xe7\xe3o do usu\xe1rio em p\xe1ginas que precisam de autentica\xe7\xe3o."}),"\n",(0,r.jsx)(n.p,{children:"Na framework Starlette isso pode ser feito dentro de um Middleware."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:'title="auth.py"',children:'import base64\nimport hashlib\nimport binascii\n\nfrom starlette.authentication import (\n    AuthenticationBackend,\n    AuthenticationError,\n    AuthCredentials,\n    SimpleUser,\n)\nfrom starlette.requests import HTTPConnection\n\nfrom database import get_user_auth\n\n\nclass AuthBackend(AuthenticationBackend):\n    async def authenticate(self, conn: HTTPConnection):\n        # No authroization, no access\n        if "Authorization" not in conn.headers:\n            return\n\n        auth = conn.headers["Authorization"]\n        scheme, credentials = auth.split()\n\n        # Wrong authorization scheme\n        if scheme.lower() != "basic":\n            return\n\n        # Extract username and password from credentials\n        credentials = base64.b64decode(credentials)\n        credentials = credentials.decode()\n        username, _, password = credentials.partition(":")\n\n        # Get real hash from database\n        salt, hash = get_user_auth(username)\n        if not salt or not hash:\n            raise AuthenticationError("Invalid credentails")\n\n        # Generate guess of hash\n        password = password.encode()\n        salt = binascii.a2b_hex(salt)\n        guess = hashlib.scrypt(password, salt=salt, n=2, r=64, p=1)\n        guess = binascii.b2a_hex(guess)\n        guess = guess.decode()\n\n        # Check if the hash guess is the same as real hash\n        if hash != guess:\n            raise AuthenticationError("Wrong password")\n\n        return AuthCredentials(["authenticated"]), SimpleUser(username)\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Note que ",(0,r.jsx)(n.code,{children:"hashlib.scrypt()"})," retorna bytes e que eles podem n\xe3o ser conversiveis para utf-8, ascii, etc..."]}),"\n",(0,r.jsx)(n.p,{children:"Ent\xe3o para facilitar a compara\xe7\xe3o, convertemos para uma string hexadecimal e armazenamos desta maneira."}),"\n",(0,r.jsx)(n.h3,{id:"server---main",children:"Server - Main"}),"\n",(0,r.jsx)(n.p,{children:"Criamos 2 endpoints:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Registrar usu\xe1rio"}),"\n",(0,r.jsx)(n.li,{children:"Acessar um conte\xfado exclusivo para usu\xe1rios"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:'title="main.py"',children:'import os\nimport hashlib\nimport binascii\n\nfrom starlette.applications import Starlette\nfrom starlette.responses import PlainTextResponse\nfrom starlette.requests import Request\nfrom starlette.routing import Route\nfrom starlette.middleware import Middleware\nfrom starlette.middleware.authentication import AuthenticationMiddleware\nfrom starlette.authentication import requires\n\nimport database\nfrom auth import AuthBackend\n\n\nasync def register(request: Request):\n    # Refuse if not in the right format\n    if request.headers.get("Content-Type") != "application/x-www-form-urlencoded":\n        return PlainTextResponse("Invalid body format", 400)\n\n    # Break down body\n    body = await request.body()\n    body = body.decode()\n    parts = body.split("&")\n    parts = [part.partition("=") for part in parts]\n\n    # Get username and password\n    username = ""\n    password = ""\n    for part in parts:\n        if part[0] == "username":\n            username = part[2]\n        elif part[0] == "password":\n            password = part[2]\n\n    if not username or not password:\n        return PlainTextResponse("Missing username or password", 400)\n\n    # Found user with this username\n    if database.get_user_auth(username)[0]:\n        return PlainTextResponse("User already exist", 403)\n\n    # Create salt and password hash\n    salt = os.urandom(16)\n    password = password.encode()\n    hash = hashlib.scrypt(password, salt=salt, n=2, r=64, p=1)\n    salt = binascii.b2a_hex(salt)\n    hash = binascii.b2a_hex(hash)\n\n    database.create_user(username, salt, hash)\n\n    return PlainTextResponse("User created")\n\n\n# Needs to be authenticated to receive this response\n@requires("authenticated")\nasync def content(request: Request):\n    return PlainTextResponse("Private content")\n\n\ndatabase.setup()\n\napp = Starlette(\n    debug=True,\n    routes=[Route("/", content), Route("/register", register, methods=["post"])],\n    middleware=[Middleware(AuthenticationMiddleware, backend=AuthBackend())],\n)\n'})}),"\n",(0,r.jsx)(n.p,{children:"Agora voc\xea pode iniciar o server com:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"uvicorn --reload main:app\n"})}),"\n",(0,r.jsx)(n.h2,{id:"client",children:"Client"}),"\n",(0,r.jsx)(n.p,{children:"Script para preparar o diret\xf3rio dos exemplos:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"mkdir client\ncd client\npython3 -m venv venv\n. venv/bin/activate\npip install httpx\ntouch content.py register.py\n"})}),"\n",(0,r.jsx)(n.h3,{id:"client---access-content",children:"Client - Access Content"}),"\n",(0,r.jsx)(n.p,{children:"A conven\xe7\xe3o para se enviar usu\xe1rio e senha \xe9:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Concatenar usu\xe1rio e senha com ",(0,r.jsx)(n.code,{children:":"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"username:password"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Transformar em base64","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"dXNlcm5hbWU6cGFzc3dvcmQ="})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Escrever antes o scheme utilizado","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"Basic dXNlcm5hbWU6cGFzc3dvcmQ="})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Enviar no campo ",(0,r.jsx)(n.code,{children:"Authorization"})," do headers"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:'title="content.py"',children:'import sys\nimport httpx\nimport base64\n\n# Get username and password from command line\nusername = sys.argv[1]\npassword = sys.argv[2]\n\n# Setup credentials string\ncredentials = f"{username}:{password}"\ncredentials = credentials.encode()\ncredentials = base64.b64encode(credentials)\ncredentials = credentials.decode()\n\n# Get content\nresponse = httpx.get("http://127.0.0.1:8000/", headers={"Authorization": f"Basic {credentials}"})\nprint(response.content)\n'})}),"\n",(0,r.jsx)(n.p,{children:"Execute o c\xf3digo para testar obter o conte\xfado do sistema:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"python content.py username password\n"})}),"\n",(0,r.jsx)(n.p,{children:"Se voc\xea ainda n\xe3o escreveu o c\xf3digo de registar, isto deve estar proibindo voc\xea de ver o conte\xfado da p\xe1gina."}),"\n",(0,r.jsx)(n.h3,{id:"client---register-user",children:"Client - Register User"}),"\n",(0,r.jsxs)(n.p,{children:["No caso de registrar, o campo ",(0,r.jsx)(n.code,{children:"Content-Type"})," no headers deve conter ",(0,r.jsx)(n.code,{children:"application/x-www-form-urlencoded"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Enquanto a conven\xe7\xe3o do body \xe9:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Concatenar nome do campo e a informa\xe7\xe3o do campo com ",(0,r.jsx)(n.code,{children:"="}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"username=USERNAME"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Concatenar todos os grupos de informa\xe7\xe3o com ",(0,r.jsx)(n.code,{children:"&"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"username=USERNAME&password=PASSWORD"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"Enviar no body do request"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",metastring:"title='register.py'",children:'import sys\nimport httpx\n\n# Get username and password from command line\nusername = sys.argv[1]\npassword = sys.argv[2]\n\n# Setup body string\nbody = f"username={username}&password={password}"\n\n# Register user\nresponse = httpx.post(\n    "http://127.0.0.1:8000/register",\n    headers={"Content-Type": "application/x-www-form-urlencoded"},\n    content=body,\n)\nprint(response.content)\n'})}),"\n",(0,r.jsx)(n.p,{children:"Execute o c\xf3digo para registar o usu\xe1rio e senha:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"python register.py username password\n"})}),"\n",(0,r.jsx)(n.p,{children:"Agora se executar novamente o c\xf3digo de pegar conte\xfado, deve conseguir ler o conte\xfado da p\xe1gina."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"python content.py username password\n"})}),"\n",(0,r.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization",children:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST",children:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type",children:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>i,a:()=>o});var r=s(67294);const a={},t=r.createContext(a);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);