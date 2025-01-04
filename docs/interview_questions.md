---
sidebar_position: 6
---

# Interview Questions

Durante uma entrevista é normal que me de um branco sobre certos assuntos, então eu decidi gravar as respostas para reforçar a minha memória.  

## Weakness

Não sou bom em questões que necessitam de raciocínio rápido.  

## Biggest fucked up

Fui responsável por escrever um script que notificava os clientes sobre produto novo.  
Alguns clientes novos tinham um formato diferente no banco e isto quebrava o script.  

O problema foi: Eu esqueci que o pod do Kubernetes estava configurado para se recriar em caso de erro.  

O que aconteceu no final foi:  
- notificava cliente 1, cliente 2, cliente 3, ..., erro
- recriava o pod
- notificava cliente 1, cliente 2, cliente 3, ..., erro
- recriava o pod
- ...

Pelo menos Kubernetes tem configuração para dar intervalos maiores entre cada criação por erro, mas ainda foi bem ruim.  

## Favorite design pattern

Observer pattern (*event-subscriber* ou *listener*).  

A atenção maior a esse pattern veio pelo fato de ser um dos principais em Godot (game engine).  
