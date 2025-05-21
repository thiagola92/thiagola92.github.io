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
    - Libera a trava do arquivo **se ele não tiver**
  - Se notar que possui, exibe o conteúdo na tela, esvazia o arquivo e **libera a trava**
- Processo 2
  - Constantemente:
    - Espera obter a trava para o arquivo
    - Verifica se o arquivo possui conteúdo
    - Libera a trava do arquivo **se ele tiver**
  - Se notar que está vazio, escreve conteúdo no arquivo e **libera a trava**

```C
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int BUFFER_SIZE = 256;

int main(void) {
  int fd = open("input.txt", O_RDWR);
  char *buffer = (char *)malloc(BUFFER_SIZE);
  int count = 0;

  memset(buffer, 0, BUFFER_SIZE);

  printf("Waiting message\n");

  while (1) {
    lockf(fd, F_LOCK, 0);
    lseek(fd, 0, SEEK_SET);
    count = read(fd, buffer, BUFFER_SIZE);

    if (count != 0) {
        break;
    }

    lockf(fd, F_ULOCK, 0);
  }

  printf("Reading message\n\n");

  do {
    printf("%s", buffer);
    count = read(fd, buffer, BUFFER_SIZE);

    if (count < BUFFER_SIZE) {
      buffer[count] = '\0';
    }

  } while (count != 0);

  printf("\n\nClearing file\n");
  ftruncate(fd, 0);
  lockf(fd, F_ULOCK, 0);
  close(fd);

  return 0;
}
```

```C
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int BUFFER_SIZE = 256;

char* MESSAGE = "Hello world";

int main(void) {
  int fd = open("input.txt", O_RDWR);
  char *buffer = (char *)malloc(BUFFER_SIZE);
  int count = 0;

  memset(buffer, 0, BUFFER_SIZE);

  printf("Waiting file to be empty\n");

  while (1) {
    lockf(fd, F_LOCK, 0);
    lseek(fd, 0, SEEK_SET);
    count = read(fd, buffer, BUFFER_SIZE);

    if (count == 0) {
        break;
    }

    lockf(fd, F_ULOCK, 0);
  }

  printf("Writing message\n");
  ftruncate(fd, 0);
  lseek(fd, 0, SEEK_SET);
  write(fd, MESSAGE, strlen(MESSAGE));
  lockf(fd, F_ULOCK, 0);
  close(fd);

  return 0;
}
```

### Signal
*Enviar um signal ao processo/thread para uma função tratar*  

Diferente de outros IPC, signal não é focado em comunicação no nível de aplicação, então não é muito utilizado para enviar dados, normalmente apenas para notificar outro processo da ocorrência de algo.  

A melhor maneira de ter uma idéia da utilidade dos signals é vendo o `signal.h` do sistema operacional. No caso do Linux:  

```C title="bits/signum-generic.h"
/* We define here all the signal names listed in POSIX (1003.1-2008);
   as of 1003.1-2013, no additional signals have been added by POSIX.
   We also define here signal names that historically exist in every
   real-world POSIX variant (e.g. SIGWINCH).

   Signals in the 1-15 range are defined with their historical numbers.
   For other signals, we use the BSD numbers.
   There are two unallocated signal numbers in the 1-31 range: 7 and 29.
   Signal number 0 is reserved for use as kill(pid, 0), to test whether
   a process exists without sending it a signal.  */

/* ISO C99 signals.  */
#define	SIGINT		2	/* Interactive attention signal.  */
#define	SIGILL		4	/* Illegal instruction.  */
#define	SIGABRT		6	/* Abnormal termination.  */
#define	SIGFPE		8	/* Erroneous arithmetic operation.  */
#define	SIGSEGV		11	/* Invalid access to storage.  */
#define	SIGTERM		15	/* Termination request.  */

/* Historical signals specified by POSIX. */
#define	SIGHUP		1	/* Hangup.  */
#define	SIGQUIT		3	/* Quit.  */
#define	SIGTRAP		5	/* Trace/breakpoint trap.  */
#define	SIGKILL		9	/* Killed.  */
#define	SIGPIPE		13	/* Broken pipe.  */
#define	SIGALRM		14	/* Alarm clock.  */

/* Archaic names for compatibility.  */
#define	SIGIO		SIGPOLL	/* I/O now possible (4.2 BSD).  */
#define	SIGIOT		SIGABRT	/* IOT instruction, abort() on a PDP-11.  */
#define	SIGCLD		SIGCHLD	/* Old System V name */

/* Not all systems support real-time signals.  bits/signum.h indicates
   that they are supported by overriding __SIGRTMAX to a value greater
   than __SIGRTMIN.  These constants give the kernel-level hard limits,
   but some real-time signals may be used internally by glibc.  Do not
   use these constants in application code; use SIGRTMIN and SIGRTMAX
   (defined in signal.h) instead.  */

/* Include system specific bits.  */
#include <bits/signum-arch.h>
```

```C title="bits/signum-arch.h"
/* Adjustments and additions to the signal number constants for
   most Linux systems.  */

#define SIGSTKFLT	16	/* Stack fault (obsolete).  */
#define SIGPWR		30	/* Power failure imminent.  */

/* Historical signals specified by POSIX. */
#define SIGBUS		 7	/* Bus error.  */
#define SIGSYS		31	/* Bad system call.  */

/* New(er) POSIX signals (1003.1-2008, 1003.1-2013).  */
#define SIGURG		23	/* Urgent data is available at a socket.  */
#define SIGSTOP		19	/* Stop, unblockable.  */
#define SIGTSTP		20	/* Keyboard stop.  */
#define SIGCONT		18	/* Continue.  */
#define SIGCHLD		17	/* Child terminated or stopped.  */
#define SIGTTIN		21	/* Background read from control terminal.  */
#define SIGTTOU		22	/* Background write to control terminal.  */
#define SIGPOLL		29	/* Pollable event occurred (System V).  */
#define SIGXFSZ		25	/* File size limit exceeded.  */
#define SIGXCPU		24	/* CPU time limit exceeded.  */
#define SIGVTALRM	26	/* Virtual timer expired.  */
#define SIGPROF		27	/* Profiling timer expired.  */
#define SIGUSR1		10	/* User-defined signal 1.  */
#define SIGUSR2		12	/* User-defined signal 2.  */

/* Nonstandard signals found in all modern POSIX systems
   (including both BSD and Linux).  */
#define SIGWINCH	28	/* Window size change (4.3 BSD, Sun).  */
```

Por padrão alguns signals já possuem comportamentos pré-definidos. Por exemplo: `SIGINT`.  

:::info
Quando executando um programa pelo terminal, se você apertar `Ctrl+C` o signal enviado para o processo é o `SIGINT`.  
:::

Fica a sua escolha se você deseja sobreescrever o comportamento de um signal (caso ele tenha um comportamento padrão).  

:::warning
Existem dois signals que não podem ter o comportamento sobreescrito: `SIGKILL` e `SIGSTOP`.   
:::

Quando um Signal é recebido pelo seu processo, o kernel pausa o fluxo normal do seu programa para executar a função que você definiu para aquele signal. Caso você não tenha definido alguma função, o comportamento padrão é executado (o qual pode ser ignorar o signal).  

Signals permitem que você envie um inteiro ou ponteiro junto deles.  

No caso de comunicação entre processos, apenas o inteiro costuma ser útil pois não podemos acessar o espaço de memória de outro processo.  

:::note
Porém se estivermos utilizando para comunicação entre threads, enviar o endereço de um dado específico é bem útil.  
:::

Existem dois signals reservados para o uso da aplicação/usuário: `SIGUSR1` e `SIGUSR2`. Podemos utiliza-los para a comunicação de nossos processo.

Por exemplo, enviar um número entre processos:  

- Processo 1
  - Exibe o PID no terminal
  - Espera em loop pelo signal com o número
  - Encerrar ao receber o número
- Processo 2
  - Lê o PID passado por argumento
  - Envia o número para o processo desejado utilizadno o signal `SIGUSR1`

```C
#include <signal.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

bool loop = true;

// Normally the function would only receive a number as paramter.
// But we setted flag SA_SIGINFO into our sigaction.
void on_user_signal(int signal_number, siginfo_t *signal_info, void *x) {
  printf("Received signal: %d\n", signal_number);
  printf("Together with number: %d\n", signal_info->si_value.sival_int);

  loop = false;
}

int main(void) {
  struct sigaction signal_action;
  signal_action.sa_flags = SA_SIGINFO;
  signal_action.sa_sigaction = on_user_signal;

  // sigaction() is recommended nowadays instead of signal().
  sigaction(SIGUSR1, &signal_action, NULL);

  printf("My PID: %d\n", getpid());
  printf("Waiting signal\n");

  while (loop) {
  }

  return 0;
}
```

```C
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>

int NUMBER = 42;

int main(int argc, char **args) {
  if (argc != 2) {
    printf("Needs to pass PID through arguments\n");
    return 1;
  }

  union sigval signal_value = {NUMBER};
  int pid = atoi(args[1]);

  printf("Sending signal to PID: %d\n", pid);
  printf("Together with number: %d\n", NUMBER);
  sigqueue(pid, SIGUSR1, signal_value);

  return 0;
}
```

### Pipe
*Ler e escrever no pipe de outro processo filho/pai*  

:::warning
Para entender bem pipe, recomendo entender bem file descriptor (o que eu não entendia muito bem).  

Recomendação: https://www.youtube.com/watch?v=rW_NV6rf0rM
:::

O conceito de pipes é bem simples, você escreve em um lado do pipe e para alguém ler do outro lado dele.  

Podemos criar um pipe com o comando `pipe()`:  

```C
#include <stdio.h>
#include <unistd.h>

int main(void) {
  int file_descriptors[2];

  pipe(file_descriptors);

  printf("Pipe input: %d\n", file_descriptors[0]);
  printf("Pipe output: %d\n", file_descriptors[1]);

  return 0;
}
```

O comando `pipe()` inseri dois file descriptors, um para a entrada do pipe e outro para a saída do pipe, no nosso array. O comando também retorna -1 em caso de erro, mas eu irei ignorar tratamentos de erros nesses exemplos.  

:::info
O que é um file descriptor? É um número inteiro utilizado pelo seu processo para pedir ao sistema operacional por acesso a um arquivo. É preciso entender que quando você escreve/lê de um arquivo, você na verdade está pedindo para o sistema operacional fazer isto para você.  

O sistema operacional possue uma tabela com todos os files descriptors de cada processo (e outras informações relacionadas ao arquivo).  

| processo id | file descriptor | file position | ... |
| ---         | ---             | ---           | --- |
| 1034        | 3               | 0             | ... |
| 567         | 7               | 10            | ... |
| 3945        | 4               | 4959          | ... |
| 12034       | 3               | 283           | ... |

Então toda vez que você deseja abrir um arquivo, o sistema operacional te entrega um file descriptor. Este file descriptor é como se fosse um ticket que permite você pedir ao sistema operacional por interações com aquele arquivo ("Oi sistema operacional, eu gostaria de escrever no arquivo relacionado a este ticket").  
:::

Começamos com o mínimo de IPC quando utilizando `pipe()` com `fork()`:  

```C
#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
  char message[3];
  int file_descriptors[2];

  pipe(file_descriptors);

  if (fork()) {
    // Parent
    wait(NULL);
    read(file_descriptors[0], message, 3);
    printf("Message: %s\n", message);
  } else {
    // Child
    write(file_descriptors[1], "hi", 3);
  }

  return 0;
}
```

Cada processo possui seus próprios file descriptors, que por sua vez levam a um arquivo/pipe/etc. Porém quando fazemos um `fork()`, nossas entradas na tabela de file descriptors também é clonada.  

Por exemplo, vamos supor que o ID do processo pai é 1034 e o filho nasceu com o ID 1035. Quando o filho nasce, ele herda todos os files descriptors:  

| processo id | file descriptor | file position | ... | leva ao pipe |
| ---         | ---             | ---           | --- | ---          |
| 1034        | 3               | 0             | ... | 1000         |
| 1035        | 3               | 0             | ... | 1000         |

Ou seja, o file descriptor com número 3 do pai e do filho irão levar ao mesmo arquivo/pipe/etc.  

Isto não quer dizer que todos os file descriptors futuros seram compartilhados! Por exemplo:  

```C
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
  int file_descriptors[2];
  int more_file_descriptors[2];

  pipe(file_descriptors);

  if (fork()) {
    // Parent
    pipe(more_file_descriptors);
    wait(NULL);
  } else {
    // Child
    pipe(more_file_descriptors);
  }

  return 0;
}
```

Ao chamar `pipe()` dentro do pai ou do filho, você está pedindo para o sistema operacional criar um pipe para aquele processo. O pai e filho receberam pipes distintos embora possuam o mesmo file descriptor (justamente pois file descriptors são identificadores únicos do processo).  

| processo id | file descriptor | file position | ... | leva ao pipe |
| ---         | ---             | ---           | --- | ---          |
| 1034        | 3               | 0             | ... | 1000         |
| 1034        | 4               | 0             | ... | 2000         |
| 1034        | 5               | 0             | ... | 2000         |
| 1035        | 3               | 0             | ... | 1000         |
| 1035        | 4               | 0             | ... | 3000         |
| 1035        | 5               | 0             | ... | 3000         |

### Named Pipe (FIFO)
*Ler e escrever no pipe de outro processo*  

A diferença deste pipe para o anterior é que qualquer processo pode se ligar a ele, seja para escrever ou ler, pois ele é praticamente um arquivo no sistema.

O comando utilizado para criar o este pipe é `mkfifo()` e da mesma maneira que arquivos tem permissões... Você deve passar as permissões do arquivo como parâmetro, no nosso caso irei passar `0666` (rw-rw-rw).  

Lembrando que um pipe só é um pipe se tiver pelo menos um lado de entrada e outro de saída, ou seja, funções de escrita/leitura do pipe irão ficar travadas até que o outro lado do pipe exista.  

Enquanto não tiver ninguém lendo do pipe, o comando `write()` irá ficar em loop esperando alguém para ler.  
Enquanto não tiver ninguém escrevendo no pipe, o comando `read()` irá ficar em loop esperando alguém começar a escrever.  

- Processo 1
  - Tenta criar o named pipe com devidas permissões
  - Abre o named pipe para escrita
  - Escreve no arquivo a mensagem
- Processo 2
  - Tenta criar o named pipe com devidas permissões
  - Abre o named pipe para leitura
  - Le do arquivo a mensagem

```C
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(void) {
  mkfifo("pipefile", 0666);

  int file_descriptor = open("pipefile", O_WRONLY);
  write(file_descriptor, "hi", 3);
  printf("Message sent\n");
  
  return 0;
}
```

```C
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(void) {
  char message[3];

  mkfifo("pipefile", 0666);

  int file_descriptor = open("pipefile", O_RDONLY);
  read(file_descriptor, &message, 3);
  printf("Message: %s\n", message);
  
  return 0;
}
```

É possível ter mais que um processo lendo do mesmo pipe mas é incerto de quem receberá o conteúdo ou se dois processos irão receber o mesmo conteúdo.  

Também é possível não ficar em loop esperando alguém começar a ler/escrever do outro lado do pipe, basta fazer um *or* quando abrindo o pipe (`O_WRONLY | O_NDELAY` ou `O_RDONLY | O_NDELAY`).  

:::info
Originalmente chamado de FIFO pelo comportamento clássico ["first in, first out"](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)), porém atualmente é mais conhecido pelo nome *named pipe* que deixa implicito que se comporta basicamente igual a um pipe.  

Originalmente criado utilizando a função `mknod()` e passando como argumento `S_IFIFO` para especificar o tipo de arquivo. Justamente por está função suportar diversos tipos:  

| #define  | value   | file type        |
| -------- | ------- | ---------------- |
| S_IFSOCK | 0140000 | socket           |
| S_IFLNK  | 0120000 | symbolic link    |
| S_IFREG  | 0100000 | regular file     |
| S_IFBLK  | 0060000 | block device     |
| S_IFDIR  | 0040000 | directory        |
| S_IFCHR  | 0020000 | character device |
| S_IFIFO  | 0010000 | FIFO             |
:::

### Message Queue
*Armazenar dados na fila para outro processo retirar*

A maior diferença deste método para os anteriores é o foco em transferência de dados estruturados em vez de inteiro/string, o que torna muito importante que o receptor conheça o formato exato dos dados. O formato dos dados é bem simples:  

```c
struct message {
  long message_type;
  struct m {
    // Add as many fields you want here.
  } message;
}
```

O primeiro campo da estrutura deve ser um `long` e é informação que a fila irá interpretar.  
O segundo campo da estrutura pode ser qualquer tipo, pois no momento de inserção na fila você irá informar o tamanho dos dados seguintes ao `long`.  

Isto quer dizer que nós poderiamos estruturar de infinitas maneiras nossa mensagem:  

```c
struct message {
  long message_type;
  char data[10];    // 10 bytes
}
```

```c
struct message {
  long message_type;
  int data;         // 4 bytes
}
```

```c
struct message {
  long message_type;
  struct d {
    char name[10];  // 10 bytes
    int age;        // 4 bytes
  } data;           // total: 14 bytes
}
```

Lembrando que podemos calcular o tamanho de qualquer dado/tipo com `sizeof`:  

```c
char data[10];

sizeof(data);       // Option 1
sizeof(char) * 10;  // Option 2
```

```c
int data;

sizeof(data);       // Option 1
sizeof(int);        // Option 2
```

```c
struct d {
  char name[10];
  int age;
} data;

sizeof(data);        // Option 1
sizeof(struct d);    // Option 2
```

Se qualquer processo pode se conectar a uma fila, então é preciso evitar que processos esbarrem em filas de outros processos. Imagina se meu processo insere algum dado no formato X e outro processo insere na minha fila algum dado no formato Y... Quem ler dessa fila tera sérios erros.  

Para evitar isto, uma fila é identificada por uma chave (do tipo `long`) que é gerada apartir de duas informações:
- `pathname` que é um caminho para um arquivo que identifica essa aplicação
  - Normalmente o caminho esperado da aplicação: `/home/thiagola92/.local/bin/application`
- `proj_id` que é um inteiro (onde os 8 menores bits são utilizados)
  - Normalmente pessoas botam uma letra qualquer: `'A'` ou `'b'`

As chances de duas aplicações formarem a mesma chave, ao usarem parâmetro, diferentes é bem baixo.  

### Shared Memory

### Socket

## High Level

### Remote Procedure Call

### HTTP API

### WebSocket

## References
- https://beej.us/guide/bgipc/
- https://en.wikipedia.org/wiki/Inter-process_communication
- https://www.youtube.com/watch?v=Y2mDwW2pMv4
- https://www.youtube.com/watch?v=83M5-NPDeWs
- https://man7.org/linux/man-pages/man2/sigaction.2.html
- https://man7.org/linux/man-pages/man3/sigqueue.3.html
- https://en.wikipedia.org/wiki/Signal_(IPC)
- https://en.wikipedia.org/wiki/Pipeline_(Unix)
- https://en.wikipedia.org/wiki/File_descriptor
- https://man7.org/linux/man-pages/man3/mkfifo.3.html
- https://man7.org/linux/man-pages/man2/mknod.2.html
- https://man7.org/linux/man-pages/man7/inode.7.html