---
slug: godot-array
title: GDScript Array
authors: thiagola92-derp
tags: [godot, gdscript, array]
---

# GDScript Array

Em vez de focar no que eu deveria para fazer um jogo, eu me distrai tentando ganhar desempenho onde não precisava...

------

Eu pretendia ter um Array de [buffs](https://en.wikipedia.org/wiki/Status_effect) e a ideia era verificar se cada um dos buffs já expirou para remover quando eles acabassem. Primeira coisa que pensei foi em percorrer ele e ir removendo um a um os que expiraram.

Conforme fui olhando a documentação de [Array](https://docs.godotengine.org/en/stable/classes/class_array.html) percebi um desafio que me chamou atenção... Remoção pode ser custoso:

```gdscript
void erase (Variant value)
```

> Note: On large arrays, this method will be slower if the removed element is close to the beginning of the array (index 0). This is because all elements placed after the removed element have to be reindexed.

```gdscript
void remove (int position)
```

> Note: On large arrays, this method will be slower if the removed element is close to the beginning of the array (index 0). This is because all elements placed after the removed element have to be reindexed.

```gdscript
Variant pop_front()
```

> Note: On large arrays, this method is much slower than pop_back as it will reindex all the array's elements every time it's called. The larger the array, the slower pop_front will be.

Primeiro fiz o código mais simples para isto, juntar todos que expiraram e depois remove-los um a um:

```gdscript
var expired: Array[Buff] = []

for buff in _buffs:
    if buff.timeout():
        expired.append(buff)

for buff in expired:
    _buffs.erase(buff)
```

Pensei nisto porque sei que não posso remover elementos do Array enquanto o percorro, isso iria causar uma bagunça durante o processo (pode fazer com que você pule elementos enquanto percorre e reindexia).

Mas o que eu aprendi em uma aula da faculdade é que posso evitar este problema se eu percorrer o Array de trás para frente (apenas use isso se você não liga para a ordem em que os elementos vão ser removidos).

```gdscript
for in in range(_buffs.size() -1, -1, -1):
    if _buffs[i].timeout():
        _buffs.erase(_buffs[i])
```

Bem mais rápido que a versão anterior e o Godot ainda consegue me sugerir os métodos a serem usados de cada elementos (pois eu usei tipagem no Array).

Não satisfeito com o fato que reindexar tem um custo grande, resolvi fazer mais uma tentativa:

```gdscript
var up_to_date: Array[Buff] = []

for buff in _buffs:
    if not buff.timeout():
        up_to_date.append(buff)

_buffs = up_to_date
```

Em vez de me preocupar em remover, apenas anoto os buffs bons para depois sobreescrever o Array.  

Lado positivo: `append()` é bem mais barato que `erase()` pois não precisa reindexar.  

Cada uma dessas maneira melhorou para quando eu precisava remover **MUITOS** elementos de um Array **MUITO** grande.  

Por exemplo, no caso de um Array com 5k ok e 5k precisando ser removidos a diferença foi de 648117µs para 2286µs (até eu estou me perguntando se eu medi corretamente isto pq isso seria um aumento de 28.000%?)  

Voltando para a realidade... Isto não é um caso normal e as chances disso acontecer em um jogo é quase impossível (até para MMORPG 5k buffs é muito).  

Pelo lado positivo está função não é custosa, mesmo nos casos pequenos ela chega a ter o custo de 0~100% a mais que anterior.

## Note

Depois de tudo isso eu pensei... eu não deveria estar dando `queue_free()` nestes meus Nodes? 🤔

Não era mais fácil deixar que os Nodes dessem `queue_free()` neles mesmo quando dessem timeout? 🤔

