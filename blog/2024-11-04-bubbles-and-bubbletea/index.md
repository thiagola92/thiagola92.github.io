---
authors: thiagola92
tags: [bubbles, bubbletea, go, golang]
---

# Bubbletea and Bubbles

## The Elm Architecture
*(MVU, Model-View-Update)*  


## Bubbletea
É responsável por rodar em loop a arquitetura Elm e todo o código para inicializar este loop é:  

```go
package main

import tea "github.com/charmbracelet/bubbletea"

func main() {
    program := tea.NewProgram(
        MyStruct{} // Here you pass your model.
    )

    _, err := program.Run()

    if err != nil {
        print(err.Error())
    }
}
```

Note que **Model** é terminologia para representar uma coleção de dados juntos e no **Bubbletea** structs foram escolhidas para representar models.  

:::note
Nos exemplos eu chamo meu model de `MyStruct` mas fica a sua escolha o nome, você poderia chamar de `MyModel`.  

Eu escolhi este nome para ficar claro que models não tem nada de mágico e são apenas structs da linguagem.  
:::

### Models Structure

```go
type MyStruct struct {
    // Fields.
}

func (m MyStruct) Init() tea.Cmd {
    // Run on initialization.
}

func (m MyStruct) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
    // Process a message.
}

func (m MyStruct) View() string {
    // Write to screen.
}
```

:::info
Em muitos tutoriais, pessoas também incluem uma função responsável por criar o model e configura-lo com os padrões desejados:  

```go
func newMyStruct() MyStruct {
    return MyStruct{
        // Set default fields values here
    }
}

func main() {
    program := tea.NewProgram(newMyStruct())
    // ...
}
```
:::

### Keys

## Bubbles

### Combined

## References
- https://guide.elm-lang.org/architecture/
- https://github.com/charmbracelet/bubbletea
- https://github.com/charmbracelet/bubbles
- https://www.youtube.com/watch?v=5lxQJS3b38w
- https://www.youtube.com/watch?v=ERaZi0YvBRs