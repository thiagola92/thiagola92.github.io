---
authors: thiagola92
tags: [file, files, database, multiple, lock]
---

# Write Safely to Files
Ano passado decidi explorar como garantir escrever em um arquivo sem que outros processos atrapalhem. Isto levou a criação do post: [Lock Files Process](../2024-07-29-lock-file-process/index.md).  

Agora o problema que tenho refletido é sobre como editar arquivos de forma segura.  

## Problem 1
Se eu possuo apenas um arquivo, eu posso utilizar locks do sistema operacional para evitar que outros processos leiam/escrevam enquanto eu estou escrevendo.  

```
process_1
└── file_a.json (get lock)
process_2
└── file_a.json (wait lock)
```

:::note
Isso não impede que processos má intencionados corrompam seu arquivo, pois eles ainda podem ignorar estas locks.  
:::

Mas o que acontece se tivermos no meio de escrever um arquivo grande e o computador desligar/travar? Existe o risco do nosso arquivo ficar escrito pela metade...  

## Problem 2
Vamos supor que temos a solução do problema acima, como solucionamos para casos onde um comando da CLI precisa alterar diversos arquivo e o computador desliga/trava no meio?  

```
process_1
├── file_a.json (editing)
├── file_b.json (editing)
└── file_c.json (editing)
```

Isto quer dizer que pode travar após terminar de editar um arquivo enquanto os outros não:  

```
process_1
├── file_a.json (edited)
├── file_b.json (editing)
└── file_c.json (editing)
```

Ler do arquivo `file_a.json` poderia nos dar a ilusão que o comando da CLI funcionou quando na realidade nem tudo foi aplicado.  

## Problem 3
O outro problema que tenho refletido é quando múltiplos processos precisam alterar múltiplos arquivos ao mesmo tempo.  

> `process_1` precisa utilizar `file_a.json` e `file_b.json`  
> `process_2` precisa utilizar `file_a.json` e `file_b.json`  

```
process_1
├── file_a.json (get lock)
└── file_b.json (get lock)
process_2
├── file_a.json (wait lock)
└── file_b.json
```

Neste caso nenhum problema ocorre pois `process_2` vai ficar esperando `process_1` liberar a lock de `file_a.json` para continuar com suas tarefas. Isso é o mesmo que executar os processos sequencialmente.  

> `process_1` precisa utilizar `file_a.json` e `file_b.json`  
> `process_2` precisa utilizar `file_b.json` e `file_c.json`  

```
process_1
└── file_a.json (get lock)
process_2
└── file_b.json (get lock)
process_1
└── file_b.json (wait lock)
process_2
└── file_c.json (get lock)
```

Neste caso, mesmo `process_1` começando primeiro, ele vai ter que esperar `process_2` liberar a lock que foi pega no meio da execução dele. Isso também não é um caso ruim, pois no final a lock deve ser liberada.  

> `process_1` precisa utilizar `file_a.json` e `file_b.json`  
> `process_2` precisa utilizar `file_b.json` e `file_a.json`  

```
process_1
└── file_a.json (get lock)
process_2
└── file_b.json (get lock)
process_1
└── file_b.json (wait lock)
process_2
└── file_a.json (wait lock)
```

É neste caso em que um [deadlock](https://en.wikipedia.org/wiki/Deadlock_(computer_science)) ocorre. Onde ambos processos ficam esperando um pelo o outro e podem nunca sair do loop.  

Mesmo que eu considere qualquer timeout que os processos tenham, nada impede de acontecer novamente e novamente... Então não é ideal só esperar que não aconteça.  

## Solution 1
Uma maneira de solucionar isto é escrever em arquivos temporários e no final substituir os originais.  

```
process_1
├── file_a.json
└── file_a.temp
```

Veja bem, enquanto você escreve nos arquivos temporários, os arquivos originais vão ficar intactos e sem risco de serem corrompidos em caso de falhas no sistema. Quando finalmente você terminar de escrever o que queria neles, você substitui os originais utilizando uma operação atómica ([`mv`](https://man7.org/linux/man-pages/man1/mv.1.html) ou [`rename`](https://man7.org/linux/man-pages/man1/rename.1.html)).  

Basicamente a lógica é:  

- Dado que temos o arquivo original (`xxxx.json`)
- Copie o conteúdo do arquivo original para o temporário (`xxxx.temp`)
- Escreva sempre no arquivo temporário
- Substitua o arquivo original pelo temporário
- Delete o arquivo temporário

Se considerarmos que temos locks:  

- Dado que temos o arquivo original (`xxxx.json`)
- **Pegue a lock do arquivo original**
- Copie o conteúdo do arquivo original para o temporário (`xxxx.temp`)
- Escreva sempre no arquivo temporário
- Substitua o arquivo original pelo temporário
- Delete o arquivo temporário
- **Solte a lock do arquivo original**

:::warning
Ambas operações `mv` e `rename` são atómicas quando se trata do mesmo volume (HD/SSD) pois é só um redirecionamento do ponteiro. Se estivermos falando dessas operações entre volumes diferentes, seria preciso que um volume copiasse para o outro volume antes e isso **não** é atómico.  
:::

Porém como estamos lidando com locks, e é necessário saber se podemos renomear um arquivo com lock... A resposta é **sim para Linux/Macos** e **não para Windows**.  

Isso ocorre pois Windows utiliza mandatory lock (em vez de advisory lock), isso obriga todos os processos a respeitarem o acesso aquele arquivo e proibi a remoção do arquivo enquanto possuir uma lock.  

### Solution 1+
Podemos contornar esse problema utilizando um arquivo de acesso como lock.  

```
process_1
├── file_a.json
├── file_a.lock
└── file_a.temp
```

Agora nos criamos a regra interna que apenas aqueles com a lock do arquivo de acesso podem escrever no arquivo.  

- Dado que temos o arquivo original (`xxxx.json`)
- **Pegue a lock do arquivo de acesso** (`xxxx.lock`)
- Copie o conteúdo do arquivo original para o temporário (`xxxx.temp`)
- Escreva sempre no arquivo temporário
- Substitua o arquivo original pelo temporário
- Delete o arquivo temporário
- **Solte a lock do arquivo de acesso**

### Solution 1++
Existe um pequeno detalhe que eu esqueci de cobrir... Enquanto operações as operações `rename` e `mv` são atómicas na memória (RAM), isso **não** quer dizer que sua mudanças já foram para o storage (HD/SSD).  

CPU trabalha com a memória e de tempos em tempos armazena as alterações no storage, ou seja, a gente chama `rename` e todos os processos já vão poder ver isso como verdade... Mas não quer dizer que as mudanças já foram salvas no storage.  

Por isto que precisamos utilizar comandos como `fsync` que forção o flush dos dados no nosso storage.  

- Dado que temos o arquivo original (`xxxx.json`)
- Pegue a lock do arquivo de acesso (`xxxx.lock`)
- Copie o conteúdo do arquivo original para o temporário (`xxxx.temp`)
- Escreva sempre no arquivo temporário
- **`fsync` no arquivo temporário**
- Substitua o arquivo original pelo temporário
- **`fsync` no diretório do arquivo original**
- Delete o arquivo temporário
- Solte a lock do arquivo de acesso

*O primeiro `fsync` garante que o arquivo temporário esteja storage antes de substituir o original.*  

:::danger
Imagina se a gente usasse `rename`, sem ele ter sido armazenado no storage!  

Quando você substitui o arquivo, você apenas está substituindo ponteiros, então é bom você ter certeza que para onde ele existe no storage (caso contrário você está apontando para lixo).
:::

*O segundo `fsync` atualiza o metadata do diretório (os arquivos que ele possue).*  

## Solution 2
Para garantir a atomicidade dessa alteração em conjunto, podemos criar um journal que irá armazenar todos os arquivos que precisam ser substituidos e seus estados.  

Iremos definir 3 estados para nossos arquivos temporários:  
- WRITE
    - Processo pode estar copiando o arquivo original
    - Processo pode estar alterando o arquivo temporário
- REPLACE
    - Processo não vai fazer mais alterações no arquivo temporário
    - Processo está substituindo o arquivo original pelo temporário
- DELETE
    - Processo já substituiu o arquivo original
    - Processo está deletando o arquivo temporário

Os arquivos temporário caminham pelos estados na ordem WRITE, REPLACE, DELETE.  

```
process_1
└── journal
    ├── file_a.temp (WRITE)
    ├── file_b.temp (WRITE)
    └── file_c.temp (WRITE)
```

Encontrar um arquivo no estado WRITE indica que o processo nunca terminou de escrever os temporários, então você pode descartar todos os arquivos temporários pois não é possível continuar de onde a tarefa parou.  

```
process_1
└── journal
    ├── file_a.temp (REPLACE)
    ├── file_b.temp (REPLACE)
    └── file_c.temp (REPLACE)
```

Encontrar um arquivo no estado REPLACE indica que é possível terminar a tarefa pois o arquivo temporário já terminou de ser alterado, basta você terminar de substituir o arquivo.  

```
process_1
└── journal
    ├── file_a.temp (DELETE)
    ├── file_b.temp (DELETE)
    └── file_c.temp (DELETE)
```

Encontrar um arquivo no estado DELETE indica que ele precisa ser removido pois já foi utilizado como deveria.  

É importante notar que todos os arquivos devem caminhar em conjunto pelas etapas. Por exemplo:  

```
process_1
└── journal
    ├── file_a.temp (REPLACE)
    ├── file_b.temp (WRITE)
    └── file_c.temp (WRITE)
```

O arquivo `file_a.temp` **não** pode ir para o estado DELETE até que todos os outros arquivos estejam no mesmo estado que ele (REPLACE).  

A ausência dessa regra pode criar cenários impossíveis de se recuperar **após uma falha no sistema**. Por exemplo:  

```
process_1
└── journal
    ├── file_a.temp (DELETE)
    ├── file_b.temp (WRITE)
    └── file_c.temp (WRITE)
```

- Não temos como reverter a alteração no `file_a.temp` pois já substituimos o arquivo
- Não podemos completar de escrever o conteúdo de `file_b.temp` e `file_c.temp` pois não sabemos o que estava sendo escrito

O próximo problema que temos é... Onde armazenar esse journal? Outro processos vão precisar ver ele para saber se precisam terminar alguma operação passada.  

### Solution 2+

## References
- https://en.wikipedia.org/wiki/Deadlock_(computer_science)
- https://man7.org/linux/man-pages/man1/mv.1.html
- https://man7.org/linux/man-pages/man1/rename.1.html
- https://man7.org/linux/man-pages/man2/fsync.2.html
- https://en.wikipedia.org/wiki/File_locking
- https://en.wikipedia.org/wiki/Atomicity_(database_systems)
- https://en.wikipedia.org/wiki/Write-ahead_logging
- https://en.wikipedia.org/wiki/Transaction_log
- https://en.wikipedia.org/wiki/Rollback_(data_management)
- https://www.sqlite.org/tempfiles.html
- https://www.sqlite.org/lockingv3.html
- https://www.sqlite.org/wal.html