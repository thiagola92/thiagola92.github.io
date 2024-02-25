---
authors: thiagola92
tags: [bit, byte, bytes, bits]
---

# Little-endian and Big-endian

Definições utilizadas para informar em que ordem os bytes vão ser escritos na memória.  

É preciso lembrar que a memória tem endereços, existe início e final.  
Para o nosso exemplo iremos usar 16 bits (2 bytes):  

```
| Endereço da memória |
| ------------------- |
| 0                   |
| 1                   |
| 2                   |
| 3                   |
| 4                   |
| 5                   |
| 6                   |
| 7                   |
| 8                   |
| 9                   |
| 10                  |
| 11                  |
| 12                  |
| 13                  |
| 14                  |
| 15                  |
```

O computador apenas trabalha com bytes (modificações são feitas em bytes, não bits).  
Então vamos representar uma divisão entre os bytes.  

```
| Endereço da memória |
| ------------------- |
| 0                   |
| 1                   |
| 2                   |
| 3                   |
| 4                   |
| 5                   |
| 6                   |
| 7                   |
| ------------------- |
| 8                   |
| 9                   |
| 10                  |
| 11                  |
| 12                  |
| 13                  |
| 14                  |
| 15                  |
```

Se pegarmos um inteiro (unsigned) como 5351, vamos precisar de 2 bytes para armazena-lo (pois seu binário é `00010100 11100111`).  
Existe duas maneiras famosas de se armazenar eles.  

**Little-endian**: Byte menos significativo primeiro ("little end first").  
**Big-endian**: Byte mais significativo primeiro ("big end first").  

```
| Endereço da memória | Little-endian | Big-endian |
| ------------------- | ------------- | ---------- |
| 0                   | 1             | 0          |
| 1                   | 1             | 0          |
| 2                   | 1             | 0          |
| 3                   | 0             | 1          |
| 4                   | 0             | 0          |
| 5                   | 1             | 1          |
| 6                   | 1             | 0          |
| 7                   | 1             | 0          |
| ------------------- | ------------- | ---------- |
| 8                   | 0             | 1          |
| 9                   | 0             | 1          |
| 10                  | 0             | 1          |
| 11                  | 1             | 0          |
| 12                  | 0             | 0          |
| 13                  | 1             | 1          |
| 14                  | 0             | 1          |
| 15                  | 0             | 1          |
```

Note que os bits não mudam de ordem, apenas os bytes.