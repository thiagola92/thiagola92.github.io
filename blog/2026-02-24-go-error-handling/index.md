---
authors: thiagola92
tags: [go, error]
---

# Elegantly Handling Error in Go

:::danger
Eu tenho meses de experiência em Go então é bem idiota da minha parte dar minha opnião sobre uma linguage que não utilizo muito.  

Sem contar que error handling é um assunto **muito** sensível dentro da comunidade de Go, pessoas odeiam e pessoas amam.  

Então este post vai servir como reflexão para mim.  
:::

## Return the Error
Parte de mim adora a simplicidade de "se sua função pode falhar, retorne o error".  

```go
func doXXX() error {
    // ...
    return err
}
```

E já que Go permite retorna multiplos resultados, não existe perda de clareza.  

```go
func doXXX() (int, error) {
    // ...
    return number, err
}
```

## Handling Error
Se a linguagem escolheu pelo design de retorna o error, quer dizer que a função que chamou precisa verificar erro.  

```go
func doYYY() error {
    value, err := doXXX()

    if err != nil {
        return err
    }

    // ...

    return nil
}
```

Por questão de simplicidade, neste exemplo estou apenas repassando o erro.  

Dito isto, fica para cada um decidir o que vai fazer quando encontrar um erro. Por exemplo:
- Escrever no log
- Adicionar mais informações ao erro
- Omitir detalhes do erro
- Repassar o erro

Todos eles são válidos! A situação que você se encontra é o que dita o melhor para se usar.  

## There's a Catch
Muitas pessoas gostam disto pois força a lidar com o erro, em vez de ficar repassando o erro até alguma função decidir tratar.  

https://go.dev/doc/faq#exceptions  

Enquanto os argumentos são válidos, eu acho que Go falha em apontar uma alternativa elegante. Pois se cria um ambiente que incentiva a seguinte estrutura:  

```go
func doXXX() error {
    err := doAAA()

    if err != nil {
        return err
    }

    err = doBBB()

    if err != nil {
        return err
    }

    err = doCCC()

    if err != nil {
        return err
    }

    err = doDDD()

    if err != nil {
        return err
    }

    // ...

    return nil
}
```

Programadores normalmente seguem regras de no máximo X caracteres por linha. Go me faz desejar que existisse uma regra de X linhas por função...  

Essa estrutura ocorre muito mais do que se imagina!  

As pessoas esquecem que as funções mais básicas de programação (como abrir arquivo) podem falhar. O que vai causar uma reação em cadeia em sua funções.  

```
A() 🟢
└── B() 🟠
    └── C() 🟠
        └── D() 🟠
            └── F() 🔴
```

Agora todas as funções acima de F() teram o código:  

```go
if err != nil {
    return err
}
```

A solução mais básica é tratar o mais cedo possível (em `D()`) mas isso só é possível quando você possue a solução do problema.  

Imagina se enquanto o usuário está baixando um jogo na [Steam](https://en.wikipedia.org/wiki/Steam_(service)) acaba o espaço no HD. A Steam precisa se comunicar com o usuário sobre o problema e ela não pode tomar a decisão de como abrir espaço.  

É a situação que você quer pausar a linha de raciocínio principal e borbulhar o erro para cima, até chegar no usuário. Olha que engraçado, parece até que existe uma razão por inventarem "try-catch"...  

## `panic()` & `recover()`
A necessidade de borbulhar o erro para cima é tão grande que Go possui dois métodos para isto `panic()` e `recover()`.  

Agora se estivermos em `F()` e iniciarmos um estado de panic, podemos solucionar em `A()`.  

```go
func F() {
    // ...

    if problem {
        panic(errors.New("Problem in F"))
    }

    // ...
}
```

Justamente pelo fato de que qualquer função chamada com `defer`, irá ser executada independente de como a função terminar (normalmente ou em estado de panic).  

```go
func A() {
    defer solvePanic()

    // ...

    B()

    // ...
}
```

E podemos sair do estado de panic e coletar o erro utilizando `recover()`.  

```go
func solvePanic() {
    if err := recover(); err != nil {
        // ...
    }
}
```

Seguindo essa lógica podemos reduzir drasticamente o número de "if-error" entre `A()` e `F()`.  


```
A() 🟢
└── B() 🟢
    └── C() 🟢
        └── D() 🟢
            └── F() 🔴
```

:::info
Isto da ao tratamento de erro uma certa elegância comparado ao try-catch, pois a ramificação fica na mesma função:  

```go
func doXXX() {
    try {
        // Default logic
    } catch XXX {
        // Execute on error
    }
}
```

Enquanto Go incentiva a deixar em outra função:  

```go
func doXXX() {
    defer solveXXX()
    // Default logic
}

func solveXXX() {
    // Execute on error
}
```
:::


## Elegant Logic Flow
Ainda possuimos o problema em que uma função pode crescer verticalmente com diversas ocorrências de "if-error".  

```go
func doXXX() error {
    err := doAAA()

    if err != nil {
        return err
    }

    err = doBBB()

    if err != nil {
        return err
    }

    err = doCCC()

    if err != nil {
        return err
    }

    err = doDDD()

    if err != nil {
        return err
    }

    // ...

    return nil
}
```

Podemos utilizar a mesma lógica da seção acima para criar uma função que causa `panic()` quando um erro é encontrado:  

```go
func assertNoErr(err error) {
    if err != nil {
        panic(err)
    }
}

func doXXX() error {
    assertNoErr(doAAA())
    assertNoErr(doBBB())
    assertNoErr(doCCC())
    assertNoErr(doDDD())

    // ...

    return nil
}
```

Na minha opnião, isto já melhora bastante a leitura.  

Porém está função está causando um `panic()` e pode não ser o que a gente queira para ela. Como podemos continuar elegantes e retornar um erro normal? Utilizando [**named return**](https://go.dev/tour/basics/7).  

```go
func doXXX() (err error) {
    // ...
}
```

Agora `err` vai ser a variável retornada pela função quando ela encerrar (e não estiver em estado de panic).  

Tudo que falta é garantir que vamos sair do estado de panic e que `err` possua o valor do último error.  

```go
func catchErr(err *error) {
    if r := recover(); r != nil {
        *err = r.(error)
    }
}

func assertNoErr(err error) {
    if err != nil {
        panic(err)
    }
}

func doXXX() (err error) {
    defer catchErr(&err)

    assertNoErr(doAAA())
    assertNoErr(doBBB())
    assertNoErr(doCCC())
    assertNoErr(doDDD())

    // ...

    return nil
}
```

# References
- https://go.dev/blog/defer-panic-and-recover
- https://go.dev/blog/error-handling-and-go
- https://go.dev/blog/error-syntax
- https://go.dev/doc/effective_go#errors
- https://go.dev/doc/faq#exceptions
- https://go.dev/tour/basics/7
- https://www.reddit.com/r/golang/comments/1in0tiw/simple_strategy_to_understand_error_handling_in_go/
- https://en.wikipedia.org/wiki/Exception_handling_(programming)