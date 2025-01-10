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

```C
static int executions = 0;

void run(int p) {
    printf("Running");
    executions += 1;
}

int main() {
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

## Explicit Memory Management

## Garbage Collection

## Reference Counting

## Ownership Model

## References
- https://en.wikipedia.org/wiki/Memory_management
- https://en.wikipedia.org/wiki/Stack-based_memory_allocation
- https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)
- https://en.wikipedia.org/wiki/Reference_counting