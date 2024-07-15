---
authors: thiagola92
tags: [lock, c, file, process]
---

# Lock Process
Quando você quer ler o arquivo, você pede ao sistema operacional pelo conteúdo do arquivo.  

Quando você quer escrever no arquivo, você pede ao sistema operacional para inserir o conteúdo no arquivo.  

É importante saber que o sistema operacional toma diversos cuidados para que desenvolvedores não acessem diretamente o hardware, ou seja, por baixo dos panos você está pedindo para o sistema operacional ler/escrever.  

- C
    - `fgets()`
    - `fwrite()`
- Python
    - `file.read()`
    - `file.write()`
- Rust
    - `file.read_to_string()`
    - `file.write_all()`
- Go
    - `os.ReadFile()`
    - `os.WriteFile()`

Veremos como garantir a segurança de um arquivo quando se tem múltiplos processos querendo altera-lo.  

## Process
A função utilizada para se criar processos é `fork()`, está função faz com que o atual processo crie um processo filho quase idêntico e executando o mesmo código que o pai.  

Olhe este código que printa duas vezes "Hi":  

```C
#include <stdio.h>
#include <unistd.h>

int main() {
    fork();
    printf("Hi\n");
}
```

Se você executa-lo irá notar que o filho é tão igual ao pai que ele continua exatamente do mesmo local que o pai se encontrava (logo após `fork()` retornar um valor). Se tivessemos variáveis, poderiamos ver que até o valor delas são idênticos ao do pai.  

No entanto, precisamos de uma maneira de reconhecer quem é o pai e filho, caso contrário este código executária exatamente a mesma coisa para ambos (não seria nada produtivo). Acontece que a função `fork()` retorna um valor e este valor é utilizado para sabermos se estamos no pai ou no filho.  

```C
#include <stdio.h>
#include <unistd.h>

int main() {
    int pid = fork();
    
    if(pid == -1) {
        printf("Failed to create child process\n");
    } else if(pid == 0) {
        printf("I'm the child process\n");
    } else {
        printf("I'm the parent process\n");
    }
}
```

A função `fork()` vai retornar ao pai o PID do filho (ou -1 em caso de error).  
A função `fork()` vai retornar ao filho zero.  

:::tip
Normalmente o código do pai e filho são inseridos em funções em vez de deixar tudo dentro de um if/else.  

```C
if(pid == 0) {
    child_code();
} else {
    parent_code();
}
```
:::

## References
- https://www.youtube.com/watch?v=ioJkA7Mw2-U
    - O importante do video é o início que explica como chamadas ao sistema são feitas
- https://man7.org/linux/man-pages/man2/flock.2.html
- https://man7.org/linux/man-pages/man3/lockf.3.html
- https://man7.org/linux/man-pages/man2/fcntl.2.html
- https://linux.die.net/man/3/flockfile
- https://en.wikipedia.org/wiki/Unistd.h
- https://en.wikipedia.org/wiki/C_standard_library
- https://en.wikipedia.org/wiki/C_file_input/output
- https://en.wikipedia.org/wiki/File_descriptor