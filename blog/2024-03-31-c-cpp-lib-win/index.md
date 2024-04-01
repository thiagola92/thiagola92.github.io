---
authors: thiagola92
tags: [c, c++, libs, lib, windows]
---

# C/C++ Libs (Win)

Durante o post [C/C++ Libs](../2024-02-12-c-cpp-lib/) escrevi sobre usar bibliotecas no Linux e nunca imaginaria que teria novamente a dor de cabeça de ver o assunto quando fosse fazer o mesmo no Windows.  

![Personagem do desenho The Owl House chorando](./hooty_crying.svg)  

:::warning
Importante avisar que eu irei escrever este post contando que você leu o [post passado](../2024-02-12-c-cpp-lib/) sobre Linux.
:::

## `.lib` (library)

Basicamente idêntico ao `.a` do Linux, uma biblioteca estática (**static library**).  

:::note
Descobri que estes arquivos podem ser abertos tranquilamente com programas de zip tipo: Winrar, 7zip, PeaZip.  

O que faz total sentido dado que eles programas para lidar com "File archive and extractor" e no Linux usando o formato `.a` de "archive".  
:::

## `.dll` (dynamic-link library)

Seria o próximo do `.so` do Linux e serve o mesmo propósito de uma biblioteca compartilhada (**shared library**) porém o Windows possui uma implementação própria deles (**dynamic-link library**).  

A grande diferença que precisamos saber é que durante a criação de bibliotecas compartilhadas, dois formatos de arquivos são criados: `.dll` e `.lib`.  

Onde o arquivo `.lib` **NÃO** é o mesmo que o gerado durante a biblioteca estática porém ainda é necessário para a utilização da biblioteca compartilhada!  
