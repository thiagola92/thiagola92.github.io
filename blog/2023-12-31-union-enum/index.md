---
authors: thiagola92
tags: [enum, rust, union]
---

# Unions e Enums

Ao começar a estudar Rust percebi o quão a relação deste dois são próxima, porém primeiro precisamos rever unions e enums.  

# Union

Se trata de utilizar o mesmo espaço de memória para armazenar um entre diversos tipos.  

```C
union Content {
    int i;
    float f;
    char c;
};

union Content content;
```

Nesse exemplo eu declarei um union que pode conter um dos seguintes valores: int, float, char.  

Então eu posso escrever qualquer um dos tipos nele:

```C
content.i = 10;
content.f = 5.0;
content.c = 'a';
```

O valor final de `content` vai ser `a` pois foi o último valor que botamos.  

Porém a parte importante é justamente o fato de usarmos o mesmo espaço de memória para armazenar qualquer um destes tipos.

```C
content.c = 'a';

printf("%c\n", content.c); // print "a"
printf("%c\n", content.i); // print "a"
```

Quando você declara uma union, o tamanho dela é definido pelo maior tamanho entre os tipos que ela precisa conseguir armazenar.  

| Tipo | Tamanho |
| ---- | ------- |
| int  | 4 bytes |
| float | 4 bytes |
| char | 1 byte |

No nosso caso o melhor tamanho seria 4 bytes, pois com ele você consegue armazenar o `char` também.  

Nada impede de armazenarmos um `char` e tentarmos ler aquele espaço da memória como um `int`.  

```C
content.c = 'a';

printf("%c\n", content.c); // print "a"
printf("%c\n", content.i); // print "a"

// O character 'a' é nada mais que o número 97 na memória.
printf("%i\n", content.c); // print "97"
printf("%i\n", content.i); // print "97"
```

Resta a nós utilizar corretamente o valor daquele espaço de memória. 

Afinal não queremos armazenar um `char` na union e mais tarde no código tentar utilizar como um `int`, né?  

```C
content.c = 'a';

// ...

printf("%i\n", content.i + 5); // print "102"
```

Não só isso como quando você armazena um valor naquele espaço de memória, ele apenas escreve no espaço que ele usaria.  

```C
content.c = 'a';

printf("%i\n", content.c); // print "97"
printf("%i\n", content.i); // print "97"

content.i = -10;
content.c = 'a';

printf("%i\n", content.c); // print "97"
printf("%i\n", content.i); // print "-159"
```

O que aconteceu aqui?  

- Início do programa os **4** bytes de `content` estão com zero
- Content recebeu no **primeiro** byte o valor 97 (pois `a` == 97)
- Printamos utilizando `content.c`
    - Isto nos faz utilizar **um** byte
- Printamos utilizando `content.i`
    - Isto nos faz utilizar **4** bytes
- Content recebeu encheu os **4** bytes para formar o valor de -10
- Content recebeu no **primeiro** byte o valor 97
- Printamos utilizando `content.c`
    - Isto nos faz utilizar **um** byte (primeiro byte está com o valor de 97)
- Printamos utilizando `content.i`
    - Isto nos faz utilizar **4** bytes (primeiro byte + os outros 3 bytes que não foram limpos)

Podemos confirmar isto settando para zero antes de preenchermos.  

```C
content.c = 'a';

printf("%i\n", content.c); // print "97"
printf("%i\n", content.i); // print "97"

content.i = -10;
content.i = 0;
content.c = 'a';

printf("%i\n", content.c); // print "97"
printf("%i\n", content.i); // print "97"
```

Como podemos ver, é essencial termos uma maneira de identificar qual é o tipo atual na union.  

# Enum

Se trata de ligar um identificador a um número único dentro de um agrupamento.  

```C
enum Type {
    Integer,
    Floating,
    Character,
};

enum Type type;
```

Neste caso está ligando:  

| Identificador | Número |
| ------------- | ------ |
| Integer       | 0      |
| Floating      | 1      |
| Character     | 2      |

Isto poupa trabalho de criarmos manualmente uma variável para cada valor, por exemplo:  

```C
int Integer = 0;
int Floating = 1;
int Character = 2;
```

Além de deixarmos claro o tipo de variável durante a criação dela (como um valor dentro daquele agrupamento).  

```C
enum Type type = Integer;

printf("%i\n", type); // print "0"
```

Enfim, a essa altura você pode já ter notado a importância de enum para unions.  

Com eles podemos criar ligar um identificador a um tipo, como se fosse uma tag para aquele union.  

```C
union content {
    int i;
    float f;
    char c;
} content;

enum Types {
    Integer,
    Floating,
    Character,
} type;

content.f = 5.0;
type = Floating;
```

Note que precisamos atualizar `type` sempre que mudarmos o tipo de `content`, porém ganhamos a capacidade de tratar corretamente a union.  

```C
if (type == Floating) {
    printf("%f\n", content.f);
} else if (type == Character) {
    printf("%c\n", content.c);
} else {
    printf("%i\n", content.i);
}
```

Este tipo de estrutura é tão comum que tem o nome de [Tagged Union](https://en.wikipedia.org/wiki/Tagged_union).  

# Rust Enum

Acredito que o `enum` do Rust seja nada mais que um tagged union.  

```Rust
#[derive(Debug)]
enum Type {
    Integer,
    Floating,
    Character,
}

println!("{:#?}", Type::Integer);
```

Em outras lugares enum ligaria apenas identificadores a números, porém em Rust você pode armazenar estrutura/tipos juntos aos enums.  

```Rust
#[derive(Debug)]
enum Type {
    Integer(i32),
    Floating(f32),
    Character(char),
}

let content: Type = Type::Floating(5.0);

println!("{:#?}", content);
```

Isso nos da uma estrutura só que possue a capacidade de fazer o mesmo que tagged union e com menos chance do desenvolvedor cometer um erro.  

Por exemplo, não precisamos mais atualizar o tipo armazenado na variável toda vez que alteramos:  

```
// C
content.f = 5.0;
type = Floating;

// Rust
let content: Type = Type::Floating(5.0);
```

Rust é linguagem que preza bastante segurança, então faria sentido tratar como se fosse uma única estrutura para evitar os problemas de union (embora Rust tenha o tipo union).  

# Comparison

### C

```C
union content {
    int i;
    float f;
    char c;
} content;

enum Types {
    Integer,
    Floating,
    Character,
} type;

content.f = 5.0;
type = Floating;

if (type == Floating) {
    // Fazer algo com float
} else if (type == Character) {
    // Fazer algo com char
} else {
    // Fazer algo com int
}
```

### Rust

```Rust
#[derive(Debug)]
enum Type {
    Integer(i32),
    Floating(f32),
    Character(char),
}

let content: Type = Type::Floating(5.0);

match content {
    Type::Floating(f) => // Fazer algo com float
    Type::Character(c) => // Fazer algo com char
    Type::Integer(i) => // Fazer algo com int
}
```