---
authors: thiagola92
tags: [godot, gui, tips]
---

# Godot GUI Tips


## 1 - Performance
Mude o modo de renderização para *Compatibility*, não é como se você fosse precisar de qualquer renderização além do básico para desenhar uma janela na tela.  

![Compatibility](compatibility.png)  

Ative *Application > Run > Low Processor Mode* para que tenha um delay entre as renderizações da janela e apenas renderizar se alguma mudança for detectada. Em jogos a tela muda constantemente, então esse tipo de delay e validação só atrapalham mas como estamos falando de GUI que altera bem menos, isto ajuda muito.  

![Low Processor Mode](low_processor_mode.png)  

## 2 - Window Title Bar
Por padrão o nosso sistema operacional nos providência o gráfico básico de uma janela e nos deixa responsável por desenhar o conteúdo dentro dela.  

![Not borderless](not_borderless.png)  

O lado positivo é que isto nos providência o básico de uma janela, como aqueles 3 botões no topo da direita (minimizar, máximizar, fechar, ...).  

Porém note que, dependendo do sistema operacional, mais opções podem estar disponíveis! Se eu clicar com o botão direito na barra do topo, podemos ver mais ações:  

![Not borderless again](not_borderless_again.png)  

Se ativarmos *Display > Window > Size > Borderless*, o sistema operacional deixará de adicionar a barra no topo:  

![Borderless](borderless.png)  

Basicamente ele está assumindo que você mesmo irá desenhar a barra no topo caso queira (normalmente em jogos isto não faz sentido).  

:::info
Borderless ou não, ainda se trata de uma janela no seu sistema operacional então atalhos que iriam minimizar, máximizar ou fechar vão funcionar normalmente.  
:::

## 3 - Multiple Windows
Janelas abertas são tratadas como processos filhos, ou seja, o encerramento de uma janela pai irá encerrar os filhos.  

Caso queiramos ter múltiplas janelas idênticas, igual a editores de textos e navegadores, precisamos ter certeza que a janela principal (processo inicial) não possa ser encerrado da maneira padrão (clickando no botão de fechar).  

Podemos resolver isto escondendo a janela principal e apenas exibindo as subwindows.  

Ative *Display > Window > Size > Transparent* para que o fundo cinza padrão não seja renderizado durante a execução.  

![Transparent background](transparent.png)  

:::note
Acredito que a cor padrão do canvas é preto, por isto deixar de pintar vai deixar a janela preta
:::

Ative *Display > Window > Per Pixel Transparency > Allowed* para que o fundo realmente seja transparente (caso contrário vai ficar o canvas preto).  

![Per Pixel Transparency](per_pixel_transparency.png)  

:::warning
Existe uma configuração que eu ainda não entendi a necessidade: *Rendering > Viewport > Transparent Background*.  

Mas a documentação menciona ela como necessária.  
:::

**Como visto na sessão anterior...**  

Ative Display > Window > Size > Borderless para o sistema operacional deixará de adicionar a barra no topo.  

![Invisible](invisible.png)  

Embora ela esteja transparente, ela ainda é uma janela como as outras. Podemos conferir que ela ainda aparece quando apertando Alt+Tab (ou apenas apertando Alt no Ubuntu).  

![Window invisible but exist](window_invisible.png)  

Agora nós temos que tratar inputs!

**Primeiro** podemos notar que se está janela for posta na frente de outra, ela não irá deixar de consumir os seus clicks (mesmo que você queira selecionar algo na janela de trás).  

Para resolver isto podemos alterar janela raiz (criada quando seu programa inicia) para repassar adiante clicks do mouse.  

```gdscript
func _ready() -> void:
	get_tree().root.mouse_passthrough = true
```

**Segundo** podemos notar que ela ainda está processando teclas (pode ser selecionada pelo Alt+Tab, fechada por Alt+F4, maximizada com Super+Up, etc).  

Ative *Display > Window > Size > No Focus* para que ela não possa ser focada (até por atalhos).  

![Process invisible](process_invisible.png)  

Lembre que fechar o processo pai fecha todos os filhos, porém fechar todos os filhos não fecha o pai.

Isto quer dizer que o processo pai continua rodando mesmo se o usuário fechar todas as janelas filhas. Agora o usuário apenas conseguiria encerrar o programa pelo "gerenciador de tarefas" ou terminal.  

Para tratar isto podemos ligar um signal a um método responsável por notar quando a quantidade de filhos mudar e encerrar o programa se necessário.  

![Signal child_order_changed](child_order_changed.png)

```gdscript
func _on_child_order_changed() -> void:
	if get_child_count() == 0:
		get_tree().quit()
```

:::note
Isto é apenas uma maneira de tratar!  

Nós poderiamos checar a cada frame se todas as janelas foram fechadas, poderiamos fazer os filhos avisarem o pai quando fossem encerrados, etc.  
:::

Agora precisamos entender que cada janela aberta é uma subwindow. Existem dois tipos de subwindows:
1. Subwindows
	- Quando sua janela pede ao sistema operacional para criar uma janela filha dela
	- Sua janela filha vai possuir a barra padrão de janelas
2. Embed subwindows
	- Quando sua janela simula outra janela dentro dela mesmo
	- Isto impossibilita ela de ser mover para fora da janela pai

Se estamos tratando de uma aplicação que possui múltiplas janelas, precisamos que ela se mova para fora da janela pai. Caso contrário isso ocorreria:  

![Subwindow + Half subwindow](subwindow_one_half.png)  

A janela 2 está saindo do limite da janela pai.  

Poderiamos inicializar a janela pai maximizada para evitar isto porém outros problemas iriam aparecer, por exemplo: Janela pai ignorar clicks e teclas, tornando impossível interagir com as janelas simuladas nele.  

Desative *Display > Window > Subwindows > Embed Subwindows* para que as subwindows sejam tratadas como janelas reais pelo sistema operacional (em vez de simuladas pela janela pai).  

![Subwindows](subwindows.png)  

Mas se quisermos ter uma barra de janela única para as nossas janelas? Podemos fazer o mesmo que fizemos com janela principal, torna-la borderless.  

![subwindows borderless](subwindows_borderless.png)  

Dentro das propriedades da Janela, ative *Flags > Borderless*.  

![subwindows borderless activate](subwindows_borderless2.png)  

Agora nós seriamos responsáveis por criar a barra no topo da janela. Desta maneira poderiamos fazer uma barra única igual ao Google Chrome ou Steam!  