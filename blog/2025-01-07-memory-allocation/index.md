---
authors: thiagola92
tags: [memory, allocation, free, referecing couting, garbage collector, ownership]
---

# Memory Allocation
Alocação de memória se trata de pedir ao sistema operacional por espaço de memória RAM para utilizarmos durante a execução do nosso programa.  

:::note
Não confundir com dispositivos de armazenamentos como HDD e SSD, onde nossa interação com eles customa ser por escrita e leitura de arquivos.  
:::

## Static Allocation
Se refere a alocar espaço para todos os dados que já se sabe que serão necessários desdo início do seu programa.  

O espaço necessário é descoberto durante a compilação de um programa e armazenado em conjunto do binário para que já seja carregada na memória na inicialização do programa.  

Compilador irá identificar:
- Literais
- Variáveis estáticas/globais
- Código de Funções

Pegando o seguinte código como exemplo:  

```C
static int executions = 0;

void run(int p) {
    printf("Running");
    executions += 1;
}

int main(void) {
    run(1);
    run(5);
    run(10);
    return 0;
}
```

Para que seu programe funcione, o compilador consegue identificar que será necessário espaço para o literal `"Running"`, variável estática `executions` e o código da função `run()`.  

A memória alocada é separada em dois segmentos:
- Data Segment
    - Variáveis estáticas
- Text Segment
    - Literais
    - Código de funções

Data segments funcionam como espaço de memória normal, onde podem ter seus valores atualizado/modificados.  

Text segments são armazenados uma vez e apenas utilizados para leitura durante a execução do seu programa.  

---

**Variáveis estáticas** caem na primeira categoria pois a qualquer momento podemos fazer algo como `executions += 1`.  

**Literais** caem na segunda pois sempre precisaremos daquele exato literal quando o código passar por aquela linha de código `printf("Running")`, então não queremos que ele seja modificado de maneira nenhuma.  

**Código de funções** são somente leitura pois estamos falando da base para se criar funções conforme o necessário. O que eu quero dizer com isto? Toda vez que executarmos uma função, utilizaremos o código da função como base para alocar memória para aquela execução da função!  

Por que não fazer com que todas as chamadas da funções utilizem o mesmo espaço? Cada chamada pode ter comportamento diferente por causa de parâmetros ou fatores externos. Isto quer dizer arriscariamos colisão entre as execuções, o que poderia trazer resultados diferentes.  

Imagine que seu código possue uma função recursiva, agora você corre o risco das chamadas a ela mesma alterarem uma variável que era essencial dela.  

## Stack Allocation
Se refere a alocação feita no início do programa para dados temporários ou curto tempo de vida. Este espaço reservado é chamado de **Stack**.  

Isto é necessário pois nosso código pode se ramificar de diversas maneiras, tornando impossível descobrir toda a memória que será utilizada durante a etapa de compilação.  

Pegando o seguinte código como exemplo:  

```C
int func1(int a, int b) {
    return a + b;
}

int func2(int a, int b) {
    int x = a * 3;
    int y = b * 2;
    return x + y;
}

int run(int a, int b) {
    if(a > 10) {
        return func1();
    } else {
        return func2();
    }
}
```

Quando uma função é chamada, o programa insere na stack variáveis daquela função.  

No caso da `func1()`: `a`, `b`.  
No caso da `func2()`: `a`, `b`, `x`, `y`.  

Ao sair da função, o programa remove esse valor da stack.  

É importante notar que como o espaço da stack já foi alocada no início do programa, inserir e remover da stack são operações rápidas.  

Quando CPUs precisam de dados da memória RAM, elas pegam um bloco de dados de cada vez. O ideal é que nessa pegada já tivesse tudo que a CPU precisaria, para ajudar nisto stacks seguem o modelo (LIFO, *last-in, first-out*).  

Pegando a `func2()` como exemplo:  

| Stack |
| ----- |
| `a` |
| `b` |
| `x` |
| `y` |

Podemos notar que inserimos na stack na ordem em que encontramos as variáveis, justamente para quando a CPU pegar um bloco de memória a chance de pegar tudo aumentar.  

Por outro lado note que essa arquitetura impede que nossas variáveis possam crescer de tamanho (`b` não poderia crescer de tamanho pois o espaço seguinte já está reservado por `x`).  

## Explicit Memory Management
Se refere a alocação feita durante a execução do programa para dados de tamanhos variados. Este espaço reservado é chamado de **Heap**.  

```C
int run(int n) {
    int *v = (int*)malloc(sizeof(int) * n);
    v[0] = 10;
    v[1] = 100;
    v[2] = 1000;
    v[3] = 10000;
    free(v);

    return 0;
}
```

## Garbage Collection

## Reference Counting

## Ownership Model

## References
- https://en.wikipedia.org/wiki/Memory_management
- https://en.wikipedia.org/wiki/Stack-based_memory_allocation
- https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)
- https://en.wikipedia.org/wiki/Reference_counting
- https://www.youtube.com/watch?v=N3o5yHYLviQ