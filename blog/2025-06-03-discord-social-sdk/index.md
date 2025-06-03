---
authors: thiagola92
tags: [discord, sdk]
---

# Discord Social SDK
Discord possui uma nomeclatura realmente confusa, pois o nome de features utilizadas pelo usuário podem não corresponder ao nome da feature na SDK **ou** features não possuem nome específico e o termo mais abrangente delas pode causa confusão com outras features.  

## Activity
*É um termo genérico para qualquer atividade que o usuário esteja fazendo e que seja compartilhada com o Discord.*  

Isto quer dizer que pode ser qualquer jogo ou software rodando fora do Discord (League of legends, Spotify, etc) quanto aquelas atividades em grupo que é possível fazer dentro do Discord com os amigos.  

No Discord, existe um botão no Discord o qual mostra a mensagem "Start an Activity" quando você para o mouse em cima. Por está feature não ter um nome mais específico, pode ser um tanto confuso referênciar saber quando está se referenciado a apenas ela ([olhe como Discord se referência a elas](https://discord.com/developers/docs/activities/overview)).  

## Guild
*É um termo dentro da SDK para se referência a servers*  

Server é um termo muito específico dentro de computação, então utilizar um termo de jogos foi uma boa ideia da SDK. Porém, o fato de não decidirem utilizar o memso termo fora da SDK causa uma grande complicação.  

## Channel
*Err... Pode ser muita coisa*  

Normalmente se imaginaria canais de texto e canais de voz, mas acontece que quase tudo é um channel:  
https://discord.com/developers/docs/resources/channel#channel-object-channel-types  

Channel pode ser visto como um objeto dentro do Discord (canal de voz, canal de texto, categoria, mensagens de grupo, threads, ...). O que só aumenta a confusão de como obter a informação/ação que você procura dentro da SDK.  

## Lobby
*É um grupo de usuários*  

É importante entender que isto existe sem a necessidade de activity/guild/channel... Basicamente é uma maneira de agrupar diversos usuários juntos para depois linkarmos o lobby com algo específico do Discord (canais de texto, ...).  

## Call

# References
- [Activity](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html)
- [Guild](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1GuildMinimal.html)
- [Channel](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ChannelHandle.html)
- [Lobby](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1LobbyHandle.html)
- [Call](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Call.html)