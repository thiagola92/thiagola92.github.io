---
authors: thiagola92
tags: [godot, gdscript, inverse kinematics, physics]
---

# Inverse Kinematics: Two Bone

Faz um mês desde que escrevi sobre [inverse kinematic look at](../2024-02-04-ik-look-at/index.md). Talvez eu esteja enrolando para falar desta pois foi por ela que eu comecei a ver inverse kinematics... e sofri muito.  

**Two bone** inverse kinematic! Dado que queremos a mão em uma devida posição, como os dois ossos responsáveis pelo braço devem se encontrar?  

Note que não vamos ditar onde a mão vai estar, porém onde desejamos que ela estivesse. Isso é importante pois o calculo muda dependendo se a mão alcança ou não a posição desejada.  

![Um braço dobrado e com a mão aberta](./arm.svg)  

## Two Bone

![Braço estendido](./arm_extended.svg)  

O que você faz quando tenta alcançar algo longe de você?  
Estica o máximo possível. 

O que você faz quando tenta alcançar algo perto de você?  
Curva o braço de forma que sua mão acabe na posição desejada.  

Primeira coisa a se fazer é descobrir se está fora ou dentro do alcance 🤣.  
Em outras palavras, a base do braço até o ponto desejado é maior ou menor que o braço todo?  

![Braço estendido com vetor para um ponto fora do alcance](./arm_extended_vec.svg)  

Podemos descobrir a distância entre dois pontos se calcularmos o vetor entre eles e depois usarmos a clássica formúla para distância. Resumidamente:  
- `P2-P1`
- `√(x²+y²)`

Sabendo disso podemos calcular as seguintes distâncias:  
- `A` -> `T`
  - Distância até posição desejada
- `A` -> `B`
  - Tamanho do osso 1
- `B` -> `C`
  - Tamanho do osso 2

Agora podemos verificar justamente se está dentro ou fora do alcance!  

```
Distância até posição desejada > (Tamanho do osso 1 + Tamanho do osso 2)
```

## Out of Range

Acontece que estender o braço em uma direção é apenas tornar o ângulo global dos ossos equivalentes ao da direção.  

![Mostrando o ângulo global do vetor](./arm_extended_ang.svg)  

![Mostrando o ângulo global do braço quando está na mesma direção do vetor](./arm_extended_ang2.svg)  

Já vimos em [IK Look at](../2024-02-04-ik-look-at/index.md) como fazer um osso/vetor apontar para uma direção e isso é tudo que precisamos fazer aqui também.  

- Apontar osso 1 para posição desejada
- Apontar osso 2 para posição desejada

Fim.

## In range - Triangle

Espero que este desenho já deixe claro como utilizaremos trigonometria com braços curvados.  

![Mostrando que braços curvados podem ser vistos como triângulos](./arm_triangle.svg)  

Neste caso o ponto onde desejamos posicionar a mão está dentro do alcance dela, então irá acabar sendo exatamente a posição da mão (utilizaremos `C` mas poderia ser `T`).  

![Mostrando um braço curvado e que utilizaremos as letras `A,B,C` para representar pontos e `a,b,c` para representar tamanho do lado do triângulo](./arm_triangle_curved.svg)  

Já calculamos os lados do triângulo, então agora vamos focar no seus ângulos internos (utilizaremos `α β γ`).  

![Mostrando um braço curvado e que utilizaremos as letras `A,B,C` para representar pontos e `a,b,c` para representar tamanho do lado do triângulo](./arm_triangle_curved2.svg)  

Sabendo todos os lados do triângulo podemos utilizar leis do cossenos para descobrir cada ângulo interno:  

```
a² = b² + c² - 2bc*cos(α)
b² = a² + c² - 2ac*cos(β)
c² = a² + b² - 2ab*cos(γ)
```

Sabendo os lados e sabendo os ângulos internos nós conseguimos dizer como o braço precisa estar dobrado. O problema é que ele ainda pode estar dessa forma de diversas maneiras 🤣:  

![Mostrando diferentes maneiras que o braço pode estar rotacionado](./arm_triangle_curved3.svg)  

## In range - Two Angles

Existem dois ângulos que estamos buscando descobrir, rotacionando eles conseguiremos os ossos exatamente onde queremos:  

![Mostrando rotação por rotação a se fazer em um braço que está inicialmente apontando para o eixo X](./arm_triangle_curved4.svg)  

Nessa imagem o braço estava esticado em direção ao eixo X, rotacionamos osso 1 por `θ1` e osso 2 por `θ2` para obter o braço no formato que queriamos.  

:::note
Eu sei que os desenhos tem ficado cada vez piores, eu deveria estar usando uma ferramenta apropriada ou organizando melhor os desenhos...  

Mas a preguiça ganhou 🙂  
:::

Como podemos obter `θ1`?  

# References
- https://www.alanzucconi.com/2018/05/02/ik-2d-1/