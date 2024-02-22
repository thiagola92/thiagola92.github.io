---
authors: thiagola92
tags: [bit, byte, bytes, bits]
---

# Little-endian and Big-endian

Definições utilizadas para informar em que ordem os bytes vão ser escritos na memória.  

Primeiro é preciso lembrar que a memória tem endereços, existe início e final.  

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

Dado que queremos armazenar o número 149, em binário `10010101`, das duas maneiras mais conhecidas de armazenas isto é little-endian e big-endian.  

**Little-endian**: Bit menos significativo primeiro.  
**Big-endian**: Bit mais significativo primeiro.  

| Endereço da memória | Little-endian | Big-endian |
| ------------------- | ------------- | ---------- |
| 0                   | 1             | 1          |
| 1                   | 0             | 0          |
| 2                   | 1             | 0          |
| 3                   | 0             | 1          |
| 4                   | 1             | 0          |
| 5                   | 0             | 1          |
| 6                   | 0             | 0          |
| 7                   | 1             | 1          |