---
authors: thiagola92
tags: [ipc, interprocess communication, inter-process communication]
---

# IPC
*(Interprocess Communication)*  

Existem diversas maneiras de fazer dois processos distintos se comunicarem e isto torna bem difícil de escolher qual deles utilizar sem antes conhecermos o mínimo delas.  

## Low Level

### File
*Escrever os dados em um arquivo e esperar que outro processo leia o arquivo.*  

Pode ser estranho por ser muito simples mas acontece que passar dados entre processos não precisa ser complicado.  

:::note
Inclusive, é como eu implementei [Mondot](https://github.com/thiagola92/Mondot) (GUI para MongoDB).  
:::

Exemplo:
- Processo 1
  - Constantemente verifica se o arquivo possui conteúdo
  - Se notar que possui, exibe o conteúdo na tela e esvazia o arquivo
- Processo 2
  - Constantemente verifica se o arquivo está vazio
  - Se notar que está vazio, escreve conteúdo no arquivo

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int BUFFER_SIZE = 256;

int main(void) {
  FILE *file = fopen("input.txt", "r+");
  char *buffer = (char *)malloc(BUFFER_SIZE);
  int count = 0;

  memset(buffer, 0, BUFFER_SIZE);

  printf("Waiting message\n");

  do {
    fseek(file, 0, SEEK_SET);
    count = fread(buffer, sizeof(char), BUFFER_SIZE, file);
  } while (count == 0);

  printf("Reading message\n\n");

  do {
    printf("%s", buffer);
    count = fread(buffer, sizeof(char), BUFFER_SIZE, file);

    if (count < BUFFER_SIZE) {
      buffer[count] = '\0';
    }

  } while (count != 0);

  printf("\n\nClearing file\n");
  freopen("input.txt", "w", file);
  fclose(file);

  return 0;
}
```

```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int BUFFER_SIZE = 256;

int main(void) {
  FILE *file = fopen("../process1/input.txt", "w+");
  char *buffer = (char *)malloc(BUFFER_SIZE);
  int count = 0;

  memset(buffer, 0, BUFFER_SIZE);

  printf("Waiting file to be empty\n");

  do {
    fseek(file, 0, SEEK_SET);
    count = fread(buffer, sizeof(char), BUFFER_SIZE, file);
  } while (count != 0);

  printf("Writing message\n");
  fprintf(file, "Hello world");
  fclose(file);

  return 0;
}
```

Note que neste exemplo eu leio e escrevo no arquivo constantemente, porém isto é apenas um exemplo!  

A realidade é que nós devemos ler ou escrever no arquivo na frequência que acharmos necessário para nosso programa. Só quero que você entenda que este método IPC é sobre processos usarem arquivos para interagir uns com os outros.  

### File Locking
*Escrever os dados em um arquivo e esperar que outro processo leia o arquivo **porém respeitando as travas**.*  

Um grande problema da maneira anterior é dois processos interagirem exatamente no mesmo momento com o arquivo. Imagine que um processo comece a ler enquanto um outro não terminou de escrever, isso fará com que ele leia conteúdo incompleto.  

A maneira de travar arquivos varia em cada sistema operacional. Por exemplo, no Linux temos:  
- `flock`
- `lockf`
- `fcntl`

Utilizaremos `lockf` para aprimorar o exemplo utilizado para arquivos:  
- Processo 1
  - Constantemente:
    - Espera obter a trava para o arquivo
    - Verifica se o arquivo possui conteúdo
    - Libera a trava do arquivo
  - Se notar que possui, exibe o conteúdo na tela e esvazia o arquivo
- Processo 2
  - Constantemente:
    - Espera obter a trava para o arquivo
    - Verifica se o arquivo possui conteúdo
    - Libera a trava do arquivo
  - Se notar que está vazio, escreve conteúdo no arquivo

### Signal

### Pipe

### Message Queue

### Shared Memory

### Socket

## High Level

### D-Bus

### Remote Procedure Call

### HTTP API

### WebSocket

## References
- https://beej.us/guide/bgipc/
- https://en.wikipedia.org/wiki/Inter-process_communication
- https://www.youtube.com/watch?v=Y2mDwW2pMv4