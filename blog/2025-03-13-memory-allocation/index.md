---
authors: thiagola92
tags: [
    memory,
    allocation,
    free,
    referecing couting,
    garbage collector,
    ownership,
]
---

# Memory Allocation

Alocação de memória se trata de pedir ao sistema operacional por espaço de
memória RAM para utilizarmos durante a execução do nosso programa.

:::note

Não confundir com dispositivos de armazenamentos como HDD e SSD, onde nossa
interação com eles customa ser por escrita e leitura de arquivos.\

:::

## Static Allocation

Se refere a alocar espaço para todos os dados que já se sabe que serão
necessários desdo início do seu programa.

O espaço necessário é descoberto durante a compilação de um programa e
armazenado em conjunto do binário para que já seja carregada na memória na
inicialização do programa.

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

Para que seu programe funcione, o compilador consegue identificar que será
necessário espaço para o literal `"Running"`, variável estática `executions` e o
código da função `run()`.

A memória alocada é separada em dois segmentos:

- Data Segment
  - Variáveis estáticas
- Text Segment
  - Literais
  - Código de funções

Data segments funcionam como espaço de memória normal, onde podem ter seus
valores atualizado/modificados.

Text segments são armazenados uma vez e apenas utilizados para leitura durante a
execução do seu programa.

---

**Variáveis estáticas** caem na primeira categoria pois a qualquer momento
podemos fazer algo como `executions += 1`.

**Literais** caem na segunda pois sempre precisaremos daquele exato literal
quando o código passar por aquela linha de código `printf("Running")`, então não
queremos que ele seja modificado de maneira nenhuma.

**Código de funções** são somente leitura pois estamos falando da base para se
criar funções conforme o necessário. O que eu quero dizer com isto? Toda vez que
executarmos uma função, utilizaremos o código da função como base para alocar
memória para aquela execução da função!

:::info

> Por que não fazer com que todas as chamadas da funções utilizem o mesmo
> espaço?

Cada chamada pode ter comportamento diferente por causa de parâmetros ou fatores
externos. Isto quer dizer arriscariamos colisão entre as execuções, o que
poderia trazer resultados diferentes.

Imagine que seu código possue uma função recursiva, agora você corre o risco das
chamadas a ela mesma alterarem uma variável que era essencial dela.\

:::

## Stack Allocation

Se refere a alocar espaço na **Stack**.

No início do programa, um espaço na memória é reservado para dados temporários
ou curto tempo de vida, este espaço reservado é chamado de Stack. Utilizar mais
espaço do que o reservado irá causar **Stack Overflow**.

Isto é necessário pois nosso código pode se ramificar de diversas maneiras,
tornando impossível descobrir toda a memória que será utilizada durante a etapa
de compilação.

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

Quando uma função é chamada, o programa insere na Stack variáveis daquela
função.

No caso da `func1()`: `a`, `b`.\
No caso da `func2()`: `a`, `b`, `x`, `y`.

Ao sair da função, o programa remove esses valores da Stack.

É importante notar que como o espaço da Stack já foi alocada no início do
programa, inserir e remover da Stack são operações rápidas.

Quando CPUs precisam de dados da memória RAM, elas pegam um bloco de dados de
cada vez. O ideal é que nessa pegada já tivesse tudo que a CPU precisaria, para
ajudar nisto Stacks seguem o modelo (LIFO, _last-in, first-out_).

Pegando a `func2()` como exemplo:

| Stack |
| ----- |
| `a`   |
| `b`   |
| `x`   |
| `y`   |

Podemos notar que inserimos na stack na ordem em que encontramos as variáveis,
justamente para quando a CPU pegar um bloco de memória a chance de pegar tudo
aumentar.

Por outro lado, note que essa arquitetura impede que nossas variáveis possam
crescer de tamanho (`b` não poderia crescer de tamanho pois o espaço seguinte já
está reservado por `x`), por isto os valores inseridos na Stack precisam ter
tamanho **fixo**.

## Explicit Memory Management

Se refere a alocar espaço na **Heap**.

Existem casos onde precisamos que a memória possa crescer ou diminuir tamanho,
justamente pois não temos como saber o quanta memória será necessária (e
armazenar toda a memória RAM para si mesmo seria rude).

É importante notar que o sistema operacional é responsável por gerenciar a
memória, então precisamos pedir a ele por espaço de memória RAM para utilizar.

Por exemplo, note como utilizamos a função `malloc()` para pedir ao sistema
operacional por espaço para 3 inteiros:

```C
int run() {
    int *v = (int*)malloc(sizeof(int) * 3);
    v[0] = 10;
    v[1] = 100;
    v[2] = 1000;
    free(v);

    return 0;
}
```

Fazer uma requisição por N espaços de memória ao sistema operacional, nos
garante N espaço de memória, ou seja, podemos receber mais espaço de memória que
o necessário (estou ignorando o caso onde a memória RAM está cheia).

Este comportamento tem como objeto minimizar a quantidade de requisições feitas
ao sistema operacional por memória, pois estas requisições custam bastante
tempo.

Vamos pegar outro exemplo:

```C
int run() {
    int *v = (int*)malloc(sizeof(int) * 3);
    v[0] = 10;
    v[1] = 100;
    v[2] = 1000;
    v[3] = 10000; // New line.
    free(v);

    return 0;
}
```

Existe a chance deste código dar erro e a chance de não dar, tudo depende de
quanta memória RAM o sistema operacional nos deu. Se ele tiver nos dado
exatamente 3, um erro de **Segmentation fault** vai aparecer pois o sistema
operacional não nos permite acessar memória RAM que ele não nos entregou.

Por outro lado, grande chance de não dar erro pois sistema operacional costumam
enviar bem mais que o necessário. O seguinte código tem bem mais chance de dar
erro:

```C
int run() {
    int *v = (int*)malloc(sizeof(int) * 3);
    v[0] = 10;
    v[1] = 100;
    v[2] = 1000;
    v[3] = 10000;
    v[100000] = 100000; // New line.
    free(v);

    return 0;
}
```

Importante notar que `v` contém o endereço da memória RAM requisitada ao sistema
operacional (o endereço na Heap), porém o valor de `v`, o endereço` é armazenado
na Stack pois é uma espaço de memória fixo (um endereço tem um tamanho fixo de
memória).

O grande problema que aparece com o uso da Heap é garantir que o seu programa
libere a memória obtida, pois é bem comum de usuários da linguagem esquecerem de
devolver a memória (`free()`).

Para evitar este tipo de problema, algumas técnicas para gerênciar memória foram
criados:

- Garbage Collection
- Reference Counting
- Ownership Model

## Garbage Collection

É uma técnica onde toda a responsabilidade de alocar e liberar memória
(`malloc()` e `free()`) é passada ao **Garbage Collector**, onde ele deve
conseguir detectar que a memória não está mais sendo usada e libera-la.

:::info

A requisição de memória (`malloc()`) sempre é feita pelo usuário, mesmo em
linguagens que possuem Garbage Collector embutido.

Pode não ser tão claro notar estes pedidos de alocação:

- Python
  - `example = []`
- GDScript
  - `var example = []`
- Java
  - `Obj example = new ArrayList<Obj>();`

:::

É possível implementar um Garbage Collector em linguagens que não possuem um
embutido, porém por não ser embutido, bibliotecas de terceiros podem acabar por
não utiliza-lo e vazamento de memória pode acontecer de qualquer maneira.

:::note

Por exemplo, para a linguagem de programação C podemos encontrar este pequeno
projeto:\
https://github.com/orangeduck/tgc\

:::

A grande desvantagem desta técnica é que pausas no seu programa precisam ser
feitas para que o Garbage Collector tenha tempo de análisar memórias que não
estão mais em uso.

## Reference Counting

Nesta técnica, toda alocação de memória inclue um contador para sabermos quantas
vezes aquele espaço alocado está sendo referenciado. Quando o contador chega a
zero, uma chamada para liberar a memória é feita (`free()`).

A quantidade de referências aumenta a qualquer momento que alguém aponta para
aquele espaço de memória. Por exemplo:

```GDScript
func _ready() -> void:
	var x = RefCounted.new()
	var y = x
	var z = [x]
	print(x.get_reference_count()) # Three
	y = null
	z = []
	print(x.get_reference_count()) # One
```

Cada vez que alguém referência o espaço de memória alocado por pedido da segunda
linha, o contador cresce.

```GDScript
func _ready() -> void:
	var x = RefCounted.new()
	var y = x
	var z = [x]
	print(x.get_reference_count()) # Three
	y = null
	z = []
	print(x.get_reference_count()) # One
```

Cada vez que alguém para de referênciar aquele espaço de memória, o contador
desce.

```GDScript
func _ready() -> void:
	var x = RefCounted.new()
	var y = x
	var z = [x]
	print(x.get_reference_count()) # Three
	y = x
	x = null
	print(y.get_reference_count()) # One
	y = x
	x = null
	print(y.get_reference_count()) # One
```

É importante notar que o contador não existe com a variável inicial, no caso
`x`, então a qualquer momento podemos fazer com que a variável inicial deixe de
referênciar e continuaremos sem problemas de usar aquela memória!

O lado negativo é que a cada referência a está variável, precisamos
aumentar/diminuir o contador. O que pode ser custoso quando tem que se fazer
isso para **toda** memória da Heap.

:::warn

A técnica mais simples de reference counting também não é bom em lidar com
**reference cycles**. Quando referências apontam entre sim, o que faz com que os
contadores nunca cheguem a zero.\

:::

## Ownership Model

Diferente das maneiras anteriores onde o programador não precisa pensar sobre a
liberação de memória, neste caso temos que seguir regras que no final ajudam o
compilador a determinar quando que a memória deve ser liberada.

Como isto é feito durante a etapa de compilação, a execução do seu software não
sofre perda de desempenho e qualquer erro relacionado ao assunto é pego durante
a compilação.

A documentação da linguagem Rust deixa claro as regras:

- Cada valor possue um dono
- Valores apenas podem possuir um dono
- Quando o dono sai do escopo, o valor é liberado

:::info

A primeira regra parece ser apenas uma introdução de que existe o conceito de
dono.\
A segunda é para deixar claro que um valor não pode ter múltiplos donos.\
A terceira nos deixa claro quando o compilador irá adicionar a liberação de
memória.\

:::

## References

- https://en.wikipedia.org/wiki/Memory_management
- https://en.wikipedia.org/wiki/Stack-based_memory_allocation
- https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)
- https://en.wikipedia.org/wiki/Reference_counting
- https://www.youtube.com/watch?v=N3o5yHYLviQ
- https://www.youtube.com/watch?v=ioJkA7Mw2-U
- https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html
