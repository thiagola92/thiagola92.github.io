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

- Reutilização de elemento
    - [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- Reutilização de grupo de elementos
    - [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template),
    [`<slot>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot)
- Reutilização de documento
    - [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)

## Reusing element

**Custom elements** se refere a habilidade de criar sua própria tag HTML, isto abre muita brecha para reutilização de código. 

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

## Reusing a groupe of elements

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

        const clone = document.importNode(template.content, true);
        divPosts.appendChild(clone);
    });
</script>

<template id="blog-post">
    <h1>A header for our post</h1>
    <p>The post text</p>
</template>

<div id="posts"></div>
```

<details>
    <summary>É possível usar ambos `importNode()` e `cloneNode()` para clonar node/fragmento</summary>

```javascript
// Using importNode()
const clone1 = document.importNode(template.content, true);
divPosts.appendChild(clone1);

// Using cloneNode()
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
</details>

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

Para substituir os slots pelo elemento desejado é bem simples (note o header de cada um):  

```html
<blog-post>
    <h1 slot="post-header">A header for our post</h1>
    <p slot="post-text">The post text</p>
</blog-post>

<blog-post>
    <h2 slot="post-header">A header for our post</h2>
    <p slot="post-text">The post text</p>
</blog-post>

<blog-post>
    <h3 slot="post-header">A header for our post</h3>
    <p slot="post-text">The post text</p>
</blog-post>
```

## Reusing documents

`<iframe>` é o elemento mais famoso quando se fala de exibir conteúdo de outra página HTML na sua página.  

```html title="index.html"
<body>
    <iframe src="blog-post.html"></iframe>
</body>
```

```html title="blog-post.html"
<h1>A header for our post</h1>
<p>The post text</p>
```

A primeira vista nós podemos até pensar que ele é a melhor opção para reutilização de código HTML, porém a utilidade dele é exibir conteúdo de outras páginas.  

**A grande diferença é segurança!** Quando falamos de exibir conteúdo de outras páginas, precisamos garantir que elas não vão conseguir acessar nada que não deveriam da sua página (por exmeplo, suas credenciais).  

A melhor maneira de fazer isso é tratando elas como outras páginas, isto faz elas passarem por todas as burocracias esperadas de comunicação entre páginas. Algumas delas sendo:  

- Funções costumam atuar apenas dentro do próprio documento.
    - `getElementById()`
    - `getElementsByClassName()`
    - `getElementsByTagName()`
    - ...
- Só é possível acessar o documento de páginas com a mesma `origin`.
    - Abrir um arquivo HTML localmente não conta como mesma `origin`.

O primeiro caso não é um grande problema, você apenas teria que pegar o documento da `<iframe>` e fazer a busca dentro dele.  

```javascript
const iframes = document.getElementsByTagName("iframe");
const iframeWindow = iframes[0].contentWindow;
const iframeDocument = iframeWindow.document;
const h1 = iframeDocument.getElementsByTagName("h1")[0]
```

O segundo caso torna impossível de testar sem antes levantar um server.  

```javascript
const iframes = document.getElementsByTagName("iframe");
const iframeWindow = iframes[0].contentWindow;
const iframeDocument = iframeWindow.document; // Error because has origin null.
```

:::tip
`contentDocument` é um atalho para `contentWindow.document`
```javascript
const iframes = document.getElementsByTagName("iframe");
const iframeDocument = iframes[0].contentDocument; // document or null.
```
:::

Isso pode ser fácilmente contornado levantando um server. Por exemplo, executando o seguinte comando no diretório do arquivo:  

```bash
python3 -m http.server
```

## Conclusion

É um tanto quanto triste ver como JavaScript é obrigatório em todos estes casos que tentamos reutilizar HTML. Principalmente para `<iframe>` que precisaria de um server.  

A elegância de HTML se encontra na simplicidade da linguagem para representar um site, o que torna bem complicado quando a reutilização de código é limitada.  

Enfim... Se meu objetivo fosse resolver com JavaScript após levantar um server, para mim seria apenas utilizar um `fetch()`.  

```javascript
const blogPost = document.getElementById("blog-post");
const response = await fetch("blog-post.html")
blogPost.innerHTML = await response.text()
```

<details>
    <summary>Curiosidade: HTML possui diversos elementos que são capazes de fazer a mesma tarefa que outros elementos.</summary>

Por exemplo, note como `<object>` e `<embed>` são extremamente genéricos:
- `<img>`, `<object>`, `<embed>`: Conseguem exibir images
- `<video>`, `<object>`, `<embed>`: Conseguem exibir video
- `<iframe>`, `<object>`, `<embed>`: Conseguem exibir conteúdo de outra página

```html
<body>
    <img src="image.png" />
    <object data="image.png"></object>
    <embed src="image.png">

    <video src="video.mp4" controls></video>
    <object data="video.mp4"></object>
    <embed src="video.mp4">

    <iframe src="page.html"></iframe>
    <object data="page.html"></object>
    <embed src="page.html">
</body>
```
</details>

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots
- https://developer.mozilla.org/en-US/docs/Web/API/Fenced_frame_API/Communication_with_embedded_frames
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/General_embedding_technologies
- https://developer.mozilla.org/en-US/docs/Web/API/Document
- https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context
- https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements
- https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy#file_origins
