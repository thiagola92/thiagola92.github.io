---
authors: thiagola92
tags: [c, libs, lib, package, packages]
---

# C lib package
Não bastava meu sofrimento com [utilização de bibliotecas](../2024-02-12-c-cpp-lib/index.md), agora tive mais dor de cabeça por elas virem do package manager (`apt`).  

Meu sofrimento foi enquanto tentava usar a biblioteca [GTK](https://www.gtk.org/) em C.  

![Rosto sorrindo com os olhos de forma idiota (e com um chápeu de mágico)](./hazbin_hotel_lucifer.svg)  

# Installing
Duas opções:  
- Instalar o pacote pronto da minha distribuição
- Baixar e compilar o código fonte

Como eu ainda tenho algum amor por mim mesmo, fui pela primeira opção:  
```bash
$ sudo apt install libgtk-4-1 libgtk-4-dev
```

E podemos descobrir os arquivos que estes pacotes trouxeram com:  
```bash
$ dpkg -L libgtk-4-1 libgtk-4-dev
```

O que nos mostra que o pacote responsável por desenvolvimento (`libgtk-4-dev`) trouxe **muitos** headers files e uma biblioteca compartilhada (`/usr/lib/x86_64-linux-gnu/libgtk-4.so`).  

![Alguns nomes de headers](./headers.svg)

# Code
Qual será o grande código utilizado durante este post???  
```C
#include <gtk/gtk.h>

int main() { return 0; }
```

Exatamente! Estou cagando para o código, apenas quero acessar a biblioteca!  
> ¿Donde esta la biblioteca?  

![Rosto do Deadpool](./deadpool.svg)

# Includes
Talvez seja meio óbvio mas o código não vai ser executado com um simples  
```bash
$ clang -o my_project main.c
```

Pois o compilador não irá encontrar a biblioteca.  
```bash
$ clang -o my_project main.c
main.c:1:10: fatal error: 'gtk/gtk.h' file not found
#include <gtk/gtk.h>
         ^~~~~~~~~~~
1 error generated.
```

Existe duas maneiras de adicionar headers ao seu código:  
- `#include "biblioteca.h"`
    - Dentro do seu diretório atual, busque o arquivo `biblioteca.h`.
- `#include <biblioteca.h>`
    - Dentro dos diretório padrões, busque o arquivo `biblioteca.h`.

:::info
Ambos os tipos aceitam caminhos para o arquivo. Exemplo:  
`#include "dir1/dir2/biblioteca.h"`  
`#include <dir1/dir2/biblioteca.h>`  

E aspas também podem ser usadas para buscar em diretórios padrões...  
Mas se você faz isso, você é um criminoso.
:::

Qual o diretório padrão para bibliotecas? `/usr/include`  

Lembra quando vimos a lista dos arquivos que o pacote trouxe? Muitos headers foram justamente para o diretório padrão.  
```bash
...
/usr/include/gtk-4.0/gtk/gtkshortcutmanager.h
/usr/include/gtk-4.0/gtk/gtkshortcutsgroup.h
/usr/include/gtk-4.0/gtk/gtkshortcutssection.h
/usr/include/gtk-4.0/gtk/gtkshortcutsshortcut.h
/usr/include/gtk-4.0/gtk/gtkshortcutswindow.h
...
```

Perfeito então, podemos alterar nosso código para usar `#include <gtk-4.0/gtk/gtk.h>`  
```C
#include <gtk-4.0/gtk/gtk.h>

int main() { return 0; }
```

E vai dar tudo cert.... ei...  
```bash
$ clang -o my_project main.c
In file included from main.c:1:
/usr/include/gtk-4.0/gtk/gtk.h:29:10: fatal error: 'gtk/css/gtkcss.h' file not found
#include <gtk/css/gtkcss.h>
         ^~~~~~~~~~~~~~~~~~
1 error generated.
```

Nope!  

![emoticon :^)](./stupid_face.svg)  

# Packages
Está é a organização do desenvolvedor da biblioteca:  
```
project/
├── gdk
├── gsk
├── gtk
└── unix-print
```

Para eles realmente é `#include <gtk/gtk.h>` por isso outras partes do código deles utiliza assim!  
E não é como se eles fossem ficar alterando **em todos os arquivos do projeto** para referênciar o caminho com versão mais recente do projeto.  

Queremos é dizer ao compilador os diretórios a procurar os arquivos...  
Pera, nós já fizemos isso no [post anterior](../2024-02-12-c-cpp-lib/index.md), usando a flag `-I`.  

```C
#include <gtk/gtk.h>

int main() { return 0; }
```

Agora basta executar utilizando a flag e sucess... ei...  
```bash
$ clang -o my_project main.c -I/usr/include/gtk-4.0
In file included from main.c:1:
In file included from /usr/include/gtk-4.0/gtk/gtk.h:29:
/usr/include/gtk-4.0/gtk/css/gtkcss.h:29:10: fatal error: 'glib.h' file not found
#include <glib.h>
         ^~~~~~~~
1 error generated.
```

Você esqueceu que está biblioteca pode usar outras bibliotecas e precisamos adicionar o diretório delas também!  

![emoticon :^) feito de emoticons :^) menores](./stupid_face_2.svg)  

# Dependecies
Existe um programa justamente para ajudar a descobrir as depêndencias de um módulo.  

```bash
$ pkg-config --cflags gtk4
-I/usr/include/gtk-4.0 -I/usr/include/pango-1.0 -I/usr/include/glib-2.0 -I/usr/lib/x86_64-linux-gnu/glib-2.0/include -I/usr/include/harfbuzz -I/usr/include/freetype2 -I/usr/include/libpng16 -I/usr/include/libmount -I/usr/include/blkid -I/usr/include/fribidi -I/usr/include/cairo -I/usr/include/pixman-1 -I/usr/include/gdk-pixbuf-2.0 -I/usr/include/x86_64-linux-gnu -I/usr/include/graphene-1.0 -I/usr/lib/x86_64-linux-gnu/graphene-1.0/include -mfpmath=sse -msse -msse2 -pthread

$ pkg-config --libs gtk4
-lgtk-4 -lpangocairo-1.0 -lpango-1.0 -lharfbuzz -lgdk_pixbuf-2.0 -lcairo-gobject -lcairo -lgraphene-1.0 -lgio-2.0 -lgobject-2.0 -lglib-2.0
```

Mas como se descobre qual o nome do módulo da minha biblioteca? Não sei, se você souber, me conte!  

:::tip
Utilizando o `pkg-config --list-all` você consegue uma lista de todos os módulos mas nada me disse explicitamente que o módulo de `libgtk-4-dev` é `gtk4`.  

Talvez seja o `Source: gtk4` quando utilizando `apt show libgtk-4-1`...  
Mas não sei ¯\\\_(ツ)\_/¯  
:::

Graças a este programa podemos gerar facilmente as flags e finalmente executar o código!  
```bash
$ clang `pkg-config --cflags gtk4` -o my_project main.c `pkg-config --libs gtk4`
```

![headers entrando numa caixa que representa o binário](./filling_box.svg)  

# Language Server
Sabe aquela ferramenta responsável por completar o código, avisar de errors, te levar à definições...  
Bem, ela está reclamando e não queremos deixar ela assim :^).  

```C
#include <gtk/gtk.h> // 'gtk/gtk.h' file not found

int main() { return 0; }
```

Estamos passando diversas informações para nosso compilador (`clang`) sobre diretórios para utilizar mas não estamos passando nada para o language server (`clangd`). Podemos fazer um teste rápido para ver o que `clangd` acha do nosso arquivo com:  

```bash
$ clangd --check=main.c
...
E[01:35:13.895] [pp_file_not_found] Line 1: 'gtk/gtk.h' file not found
...
```

# Project dependencies
Poderiamos pesquisar e descobrir os argumentos a se passar ao `clangd` mas isso é algo que varia de projeto a projeto e última coisa que queremos é ficar configurando no Visual Studio os argumentos para cada projeto.  

Por isso que `clangd` por padrão sempre procura configurações do projeto em certos arquivos do projeto como `compile_commands.json`! Poderiamos escrever este arquivo na mão... mas não queremos então vamos utilizar um programinha amigo chamado `bear`!  

```bash
$ sudo apt install bear
$ bear -- clang `pkg-config --cflags gtk4` -o my_project main.c `pkg-config --libs gtk4`
```

Pronto, conseguimos o arquivo de configuração para o `clangd`.  
Basta dar um tempo (ou reniciar o editor de texto) e seu language server deve perceber que está tudo certo!  

Fim!  
Código funciona!  
Language server funciona!  
Você está pronto para desenvolver com GTK!  
O resto que vou escrever é extra, pois não estou satisfeito com o quanto sofri até agora :').  

# [Extra] Project dependencies with Meson
GTK adora falar do [Meson](https://mesonbuild.com/) e como já estou sofrendo mesmo... Por que não parar pra ver?  

```
$ sudo apt install meson ninja-build
```

Já possuo um diretório com o projeto então vamos inicializar nele mesmo:
```bash
$ meson init
```

O arquivo `meson.build` é criado com a seguinte informação:  
```meson
project('my_project', 'c',
  version : '0.1',
  default_options : ['warning_level=3'])

executable('my_project',
           'main.c',
           install : true)
```

Meson separa todos os arquivos dele em uma pasta que é definida durante o setup (eu dei o nome de `builddir`):  
```bash
$ meson setup builddir
```

Se entrarmos nesta pasta podemos compilar o projeto:
```bash
$ cd builddir
$ meson compile
INFO: autodetecting backend as ninja
INFO: calculating backend command to run: /usr/bin/ninja
[1/2] Compiling C object my_project.p/main.c.o
FAILED: my_project.p/main.c.o 
cc -Imy_project.p -I. -I.. -fdiagnostics-color=always -D_FILE_OFFSET_BITS=64 -Wall -Winvalid-pch -Wextra -Wpedantic -O0 -g -MD -MQ my_project.p/main.c.o -MF my_project.p/main.c.o.d -o my_project.p/main.c.o -c ../main.c
../main.c:1:10: fatal error: gtk/gtk.h: No such file or directory
    1 | #include <gtk/gtk.h>
      |          ^~~~~~~~~~~
compilation terminated.
ninja: build stopped: subcommand failed.
```

Reconhece este erro? Yeaaahhh :^D.  

Quando utilizando Meson, também é preciso informar as dependências! Isto é feito pelo arquivo `meson.build`:  
```meson
project('my_project', 'c',
  version : '0.1',
  default_options : ['warning_level=3'])

executable('my_project',
           'main.c',
           install : true,
           dependencies: dependency('gtk4'))
```

Pronto! Execute `meson compile` novamente do diretório `builddir` e não vai ter erros (talvez warnings).  

:::info
Note que `dependencies` aceita lista para caso você tenha várias:  
```meson
executable('my_project',
           'main.c',
           install : true,
           dependencies: [dependency('gtk4')])
```
:::

Meson também cria um arquivo `compile_commands.json` dentro da nossa pasta `builddir`, então se quiser copiar e botar na raiz do seu projeto seu `clangd` irá agradecer!  

# References
- https://linuxcommand.org/lc3_lts0040.php
- https://github.com/rizsotto/Bear
- https://mesonbuild.com/Tutorial.html