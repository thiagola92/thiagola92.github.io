---
authors: thiagola92
tags: [c, c++, libs, lib, windows]
---

# C/C++ Libs (Win)

Durante o post [C/C++ Libs](../2024-02-12-c-cpp-lib/index.md) escrevi sobre usar bibliotecas no Linux e nunca imaginaria que teria novamente a dor de cabeça de ver o assunto quando fosse fazer o mesmo no Windows.  

![Personagem do desenho The Owl House chorando](./hooty_crying.svg)  

:::warning
Importante avisar que eu irei escrever este post contando que você leu o [post passado](../2024-02-12-c-cpp-lib/index.md) sobre Linux.  

Irei ser breve e não irei estudar detalhes que nem fiz no do linux (pois estou cansado do assunto).  
:::

## `.lib` (library)

Basicamente idêntico ao `.a` do Linux, uma biblioteca estática (**static library**).  

:::note
Descobri que estes arquivos podem ser abertos tranquilamente com programas de zip tipo: Winrar, 7zip, PeaZip.  

O que faz total sentido dado que eles programas para lidar com "File archive and extractor" e no Linux usando o formato `.a` de "archive".  
:::

## `.dll` (dynamic-link library)

Seria o próximo do `.so` do Linux, servindo o mesmo propósito de uma biblioteca compartilhada (**shared library**) porém o Windows possui uma implementação própria deles (**dynamic-link library**).  

A grande diferença que precisamos saber é que durante a criação de bibliotecas compartilhadas, três formatos de arquivos são criados: `.dll`, `.lib` e `.exp` (vamos ignorar este último).  

Onde o arquivo `.lib` **NÃO** é o mesmo que o gerado durante a biblioteca estática! Porém ainda é necessário para a utilização da biblioteca compartilhada.  

## Project from Zero

Seguiremos a mesma ideia do post no Linux. Apenas tendo o nosso código:  

```
project/
└── src/
    ├── main.c
    └── ...
```

```
cl src\main.c
```

---

Agora com um header:  

```
project/
├── include/
│   └── header.h
└── src/
    ├── main.c
    └── ...
```

```
cl src/main.c /Iinclude
```

---

### `.lib`

```
project/
├── include/
│   └── header.h
├── lib/
│   └── name.lib
└── src/
    ├── main.c
    └── ...
```

```
cl src/main.c /Iinclude lib/name.lib
```

:::note
Windows não tem o padrão de botar `lib` na frente das bibliotecas então não precisa nem pensar nisso.
:::

### `.dll`

Dessa vez vamos separar em duas etapas: compilar o código para `.obj` e depois linkar (gerar o `.exe`), isso torna mais fácil adicionar explicações no meio.  

```
project/
├── include/
│   └── header.h
├── lib/
│   └── name.lib
└── src/
│   ├── main.c
│   └── ...
└──  name.dll
```

Lembre que bibliotecas dinâmicas no Windows utilizam um arquivo `.dll` e um `.lib` (por isso temos os dois no projeto).  
Windows busca os arquivos `.dll` na mesma pasta do executável, por isso ele não está na pasta lib.  

```
cl src/main.c /c /Iinclude /Dexample
```

`/c` é justamente para pausar antes de linkar.  
`/Dexample` é uma maneira de adicionar uma definição no início do código, equivalente a 

```C
#define example
```

Por que precisamos definir? Em bibliotecas do Windows, muitas vezes pode se encontrar código como o seguinte:  

```C
#if defined(EXPORT_DLL)
    #define LIB_API __declspec(dllexport)
#elif defined(IMPORT_DLL)
    #define LIB_API __declspec(dllimport)
#else
    #define LIB_API
#endif
```

Onde `LIB_API` é substituido por:
- `__declspec(dllexport)` quando criando uma biblioteca dinânmica
- `__declspec(dllimport)` quando importando uma biblioteca dinâmica
- nada quando é uma biblioteca estática

Não entendo bem do assunto então não pretendo entrar no assunto, mas é a maneira do windows lidar com bibliotecas dinâmicas.  

Biblitoecas geralmente requerem que você passe essa definição para que ela adicione o contexto certo ao código durante a criação do objeto (para fazer [name mangling](https://en.wikipedia.org/wiki/Name_mangling) corretamente?).  

---

```
link /LIBPATH:lib name.lib main.obj
```

É durante a etapa de linkar que o arquivo `.lib` é finalmente utilizado!  

Lembrando novamente que o executável vai buscar o `.dll` na pasta do executável, então bote ambos juntos.  

