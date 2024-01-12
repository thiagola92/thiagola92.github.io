---
sidebar_position: 6
---

# Interview Questions

Perguntas pessoais de entrevistas e suas respectivas respostas.  

> **Por que agrupar as respostas aqui?**  

Durante uma entrevista eu costumo não lembrar das respostas (ou posso até nunca ter pensado sobre o assunto).  
Agrupar todas em um local pode me ajuda a memorizar e sempre ter onde revisar.  

> **Se um entrevistador ver essa seção, ele pode não fazer as perguntas dela.**  

Caso ele tenha lido as respostas, isto já da a ele o que ele procurava e abre espaço para outras perguntas.  

> **Você perde a chance de surprender o entrevistador com as respostas!**  

Sim, mas surprender os outros nunca foi meu forte e eu gosto de deixar todas as cartas na mesa.  

## Weakness

Slow thinking

## Biggest fucked up

Fui responsável por escrever um script que notificava os clientes sobre produto novo.  
Alguns clientes novos tinham um formato diferente no banco e isto quebrava o script.  

O problema maior foi: Eu esqueci que o pod do Kubernetes estava configurado para se recriar em caso de erro.  

O que aconteceu no final foi:  
- notificava cliente 1, cliente 2, cliente 3, ..., erro
- recriava o pod
- notificava cliente 1, cliente 2, cliente 3, ..., erro
- recriava o pod
- ...

Pelo menos kubernetes tem configuração para dar intervalos maiores entre cada criação por erro, mas ainda foi bem ruim.  

## Design pattern

Observer pattern, também conhecido por "event-subscriber" ou "listener".  
Ser capaz de ser notificado quando um evento ocorrer passou é o meu favorito, principalmente durante desenvolvimento de jogos.  
