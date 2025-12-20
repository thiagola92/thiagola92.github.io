---
authors: thiagola92
tags: [web, html, javascript, css]
---

# HTML importing HTML

:::note

Eu **não** tenho anos de experiência em HTML, CSS e JavaScript, então não
considere este post uma boa fonte de informação. Usei muito quando criança mas
não tenho feito nada além do mínimo necessário para o dia-a-dia.

Engraçado que enquanto eu ia escrevendo esse post, descobri que sou mais velho
que HTML 🥲.

:::

Reutilização de código é algo normal para um programador, tanto que todas as
linguagens de programação possuem maneira de trazer código de outro arquivo:

| Linguagem  | Importe            |
| ---------- | ------------------ |
| C          | `#include <xxx.h>` |
| GDScript   | `load("xxx.gd")`   |
| Go         | `import "xxx"`     |
| Java       | `import xxx`       |
| JavaScript | `import "xxx"`     |
| Python     | `import xxx`       |
| Rust       | `use xxx`          |

Embora HTML não seja uma linguagem de programação, reutilização continua sendo
importante.

Vamos analisar 3 tipos de reutilização que HTML fornece:

- [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template),
  [`<slot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot)
  - Ajudam a reutilização de elementos
- [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe),
  [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/object),
  [`<embed>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/embed),
  [`<fencedframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fencedframe)
  - Ajudam a reutilização de documentos

## Custom Elements

Se refere a habilidade de criar sua própria tag HTML, isto abre muita brecha para reutilização de código. 

```javascript
customElements.define(
    "blog-post",
    class extends HTMLElement {
        constructor() {
            super();

            const h1 = document.createElement("h1");
            const p = document.createElement("p");
            const shadowRoot = this.attachShadow({ mode: "open" });

            h1.innerText = "A header for our post"
            p.innerText = "The post text"

            shadowRoot.appendChild(h1);
            shadowRoot.appendChild(p);
        }
    },
);
```

Com isto criamos um elemento novo: `<blog-post>`, que por sua vez já possui dois elementos dentro dele (`<h1>`, `<p>`).  

```html
<blog-post/>
```

## Reutilização de elementos

### `<template>`

`<template>` é utilizado para agrupar um conjunto de elementos que você deseja
reutilizar mais tarde.

```html
<template id="blog-post">
    <h1>A header for our post</h1>
    <p>The post text</p>
</template>
```

O template não é renderizado na página, ou seja, o usuário não enxerga o
template. A idéia é deixar um conjunto de elementos prontos para você criar
conforme o necessário (não para ter alguma visualização no momento).

```html
<script>
    window.addEventListener("load", (e) => {
        const template = document.getElementById("blog-post");
        const divPosts = document.getElementById("posts");

        const clone0 = document.importNode(template.content, true);
        divPosts.appendChild(clone0);

        const clone1 = document.importNode(template.content, true);
        divPosts.appendChild(clone1);

        const clone2 = document.importNode(template.content, true);
        divPosts.appendChild(clone2);
    });
</script>

<template id="blog-post">
    <h1>A header for our post</h1>
    <p>The post text</p>
</template>

<div id="posts"></div>
```

:::danger

Ambos `importNode()` e `cloneNode()` clonam o node/fragmento:

```javascript
// Alternative 1
const clone1 = document.importNode(template.content, true);
divPosts.appendChild(clone1);

// Alternative 2
const clone2 = template.content.cloneNode(true);
divPosts.appendChild(clone2);
```

`importNode()` irá adaptar o conteúdo do template para o documento que está
importando ele.

Se o template tiver um custom element, esse elemento vai ter o comportamento que
tiver definido no document que está importando.

`cloneNode()` irá utilizar o conteúdo do template considerando o
documento/fragment do qual ele veio.

Se o template tiver um custom element, esse elemento vai ter o comportamento que
tiver definido no document do template.

---

O recomendado é utilizar `importNode()` pois os elementos custom vão se
comportar como esperado por quem está importando.

:::

### `<slot>`

`<slot>` é usado para reservar um espaço para um elemento que mais tarde será
decidido.

```html
<template id="blog-post">
    <slot name="post-header"></slot>
    <slot name="post-text"></slot>
</template>
```

Em outras palavras, no lugar do primeiro slot poderiamos inserir o elemento que
quisessemos (`<h1>`/`<h2>`/`<h3>`/...) e o mesmo para o segundo slot.

Eu não consegui utiliza-lo sem ser criando um custom element, então espero que você tenha lido a seção sobre custom elements.

```javascript
customElements.define(
  "blog-post",
  class extends HTMLElement {
    constructor() {
      super();

      let template = document.getElementById("blog-post");
      const shadowRoot = this.attachShadow({ mode: "open" });

      shadowRoot.appendChild(document.importNode(template.content, true));
    }
  },
);
```

Poderiamos ter criado todo os nodes internos deste elemento pelo javascript, mas ao invés disso nós apenas copiamos os elementos do nosso template (isto já diminui muito a quantidade de javascript que é preciso escrever).

Para substituir os slots pelo elemento desejado é bem simples:  

```html
<blog-post>
    <h1 slot="post-header">A header for our post</h1>
    <p slot="post-text">The post text</p>
</blog-post>
```

## Reutilização de documentos

### `<iframe>`

### `<object>`

### `<embed>`

### `<fencedframe>`

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots
- https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context
- https://developer.mozilla.org/en-US/docs/Web/API/Document
- https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy#file_origins
- https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements

## backup

Um detalhe que me incomoda profundamente em HTML é a ausência de um **"import"**
decente.

Alguma maneira que me deixe separar o desenvolvimento da minha página em
diversos arquivos HTML. O motivo principal é organização, um motivo secundário
seria reutilização.

Não é que não exista nenhuma maneira de importar, mas elas não são construidas
da maneira que você esperaria dentro dos navegadores.

## [`<iframe>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element), [`<object>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element), [`<embed>`](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element)

Vamos pegar o seguinte código como exemplo:

```html
<body>
    <iframe src="file.html"></iframe>
</body>
```

E considerar o arquivo `file.html` com o conteúdo:

```html
<div>
    <button>Hello world</button>
</div>
```

Para qual das alternativas seguintes o seu navegador vai transforma-lo?

<table>
    <tr>
        <td>1</td>
        <td>
            ```html
            <body>
                <div>
                    <button>Hello world</button>
                </div>
            </body>
            ```
        </td>
    </tr>
    <tr>
        <td>2</td>
        <td>
            ```html
            <body>
                <iframe src="file.html">
                    <div>
                        <button>Hello world</button>
                    </div>
                </iframe>
            </body>
            ```
        </td>
    </tr>
    <tr>
        <td>3</td>
        <td>
            ```html
            <body>
                <iframe src="file.html">
                    #document (file:///home/user/dir/file.html)
                    <html>
                        <head></head>
                        <body>
                            <div>
                                <button>Hello world</button>
                            </div>
                        </body>
                    </html>
                </iframe>
            </body>
            ```
        </td>
    </tr>

</table>

E a resposta correta é..... A terceira opção!

:::info

Antes que você comece a considerar os outros 2 elementos, sinto informar que
estes 3 elementos produzem o mesmo resultados quando trazendo conteúdo HTML de
outra página:

```html
<iframe src="file.html"></iframe>
<object data="file.html"></object>
<embed src="file.html"></embed>
```

:::

Em outras palavras, o navegador transforma em um
[navigable](https://html.spec.whatwg.org/multipage/document-sequences.html#navigable)
e é tratado como um documento dentro do seu documento original.

> Mas qual o lado negativo disso?\
> No final das contas você está obtendo o HTML que queria na sua página.

O problema é que isto complica um pouco mais a interação com os elementos. Por
exemplo, não podemos obter o botão com:

```javascript
const buttons = document.getElementsByTagName("button");
```

Pois ele só existe dentro do documento da iframe, ou seja, nosso código se
tornaria

```javascript
const iframes = document.getElementsByTagName("iframe");
const buttons = iframes[0].contentDocument.getElementsByTagName("button");
```

> Mas qual o problema disso?!\
> Eu consigo entender claramente o código e não é um grande problema.

O problema é que navegadores apenas permitem que você acesse o documento se ele
for da mesma origem (`Same-Origin`)?.

Então precisamos rodar um server, por exemplo:

```bash
python3 -m http.server
```
