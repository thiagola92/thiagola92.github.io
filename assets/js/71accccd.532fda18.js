"use strict";(self.webpackChunkthiagola_92_github_io=self.webpackChunkthiagola_92_github_io||[]).push([[2302],{51919:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>l,contentTitle:()=>t,default:()=>p,frontMatter:()=>n,metadata:()=>o,toc:()=>c});var s=r(85893),i=r(11151);const n={authors:"thiagola92",tags:["web","scraping","scrapers","crawlers","crawler","browser","html","http","css","xpath","puppeteer","playwright","selenium"]},t="Web Crawler",o={permalink:"/blog/2024/10/10/web-crawler",editUrl:"https://github.com/thiagola92/thiagola92.github.io/tree/master/blog/2024-10-10-web-crawler/index.md",source:"@site/blog/2024-10-10-web-crawler/index.md",title:"Web Crawler",description:"Crawler: Respons\xe1vel por navegar entre websites utilizando links encontrados neles mesmos",date:"2024-10-10T00:00:00.000Z",formattedDate:"10 de outubro de 2024",tags:[{label:"web",permalink:"/blog/tags/web"},{label:"scraping",permalink:"/blog/tags/scraping"},{label:"scrapers",permalink:"/blog/tags/scrapers"},{label:"crawlers",permalink:"/blog/tags/crawlers"},{label:"crawler",permalink:"/blog/tags/crawler"},{label:"browser",permalink:"/blog/tags/browser"},{label:"html",permalink:"/blog/tags/html"},{label:"http",permalink:"/blog/tags/http"},{label:"css",permalink:"/blog/tags/css"},{label:"xpath",permalink:"/blog/tags/xpath"},{label:"puppeteer",permalink:"/blog/tags/puppeteer"},{label:"playwright",permalink:"/blog/tags/playwright"},{label:"selenium",permalink:"/blog/tags/selenium"}],hasTruncateMarker:!1,authors:[{name:"Thiago Lages de Alencar",title:"Desenvolvedor de Software",url:"https://github.com/thiagola92",imageURL:"/img/dino.svg",key:"thiagola92"}],frontMatter:{authors:"thiagola92",tags:["web","scraping","scrapers","crawlers","crawler","browser","html","http","css","xpath","puppeteer","playwright","selenium"]},unlisted:!1,prevItem:{title:"Godot GUI Tips",permalink:"/blog/2024/10/26/godot-gui-tips"},nextItem:{title:"Godot Drama",permalink:"/blog/2024/10/01/godot-drama"}},l={authorsImageUrls:[void 0]},c=[{value:"Browser",id:"browser",level:2},{value:"Selenium",id:"selenium",level:3},{value:"Puppeteer",id:"puppeteer",level:3},{value:"Playwright",id:"playwright",level:3},{value:"Raw",id:"raw",level:2},{value:"Cat and Mouse Game",id:"cat-and-mouse-game",level:2},{value:"References",id:"references",level:2}];function d(e){const a={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(a.p,{children:[(0,s.jsx)(a.strong,{children:"Crawler"}),": Respons\xe1vel por navegar entre websites utilizando links encontrados neles mesmos",(0,s.jsx)(a.br,{}),"\n",(0,s.jsx)(a.strong,{children:"Scraper"}),": Respons\xe1vel por extrair informa\xe7\xf5es importantes dos websites navegados"]}),"\n",(0,s.jsxs)(a.p,{children:["Crawling \xe9 ess\xeancial para scraping, pois voc\xea n\xe3o tem como conseguir extrair informa\xe7\xf5es de um site sem navegar para ele antes.",(0,s.jsx)(a.br,{}),"\n","Scraping n\xe3o \xe9 ess\xeancial para crawling, pois os dados do site podem ser irrelevantes para voc\xea."]}),"\n",(0,s.jsx)(a.p,{children:"Por exemplo:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Google utiliza um crawler para navegar a internet e indexar p\xe1ginas delas, por\xe9m n\xe3o extrai as informa\xe7\xf5es dos websites em si"}),"\n",(0,s.jsx)(a.li,{children:"OpenAI utiliza scraper para pegar os videos do youtube e utilizar na intelig\xeancia artificial deles"}),"\n"]}),"\n",(0,s.jsx)(a.p,{children:"Se eu tivesse que separar crawlers em categorias, seria:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Browser"}),": Utilizando um browser real para crawlear"]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.strong,{children:"Raw"}),": Simulando um browser atr\xe1ves de requisi\xe7\xf5es pela internet"]}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:["Hoje em dia simular um navegador \xe9 incrivelmente dif\xedcil ent\xe3o a maneira ",(0,s.jsx)(a.strong,{children:"raw"})," \xe9 bem menos potente e fornece muito menos funcionalidades."]}),"\n",(0,s.jsx)(a.h2,{id:"browser",children:"Browser"}),"\n",(0,s.jsx)(a.p,{children:"Existem 3 ferramentas famosas de automa\xe7\xe3o de navegadores:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"https://www.selenium.dev/",children:"Selenium"})}),"\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"https://pptr.dev/",children:"Puppeteer"})}),"\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"https://playwright.dev/",children:"Playwright"})}),"\n"]}),"\n",(0,s.jsx)(a.p,{children:"\xc9 importante notar que elas todas se declaram para usos de testes, por\xe9m ainda assim s\xe3o muito utilizadas para web scraping."}),"\n",(0,s.jsx)(a.h3,{id:"selenium",children:"Selenium"}),"\n",(0,s.jsx)(a.p,{children:"Criado em ~2004 mas que continua a oferecer suporte para todos os navegadores e diversas linguagens (n\xe3o necessariamente bem)."}),"\n",(0,s.jsx)(a.p,{children:"Muito do seu estilo vem do fato de ter sido criado utilizando Java e depois adaptado para outras linguagens."}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-javascript",metastring:'title="javascript"',children:"import { Browser, Builder, By } from \"selenium-webdriver\";\n\nconst driver = await new Builder().forBrowser(Browser.CHROME).build()\nawait driver.get('https://www.etiquetaunica.com.br/')\nawait driver.manage().setTimeouts({implicit: 1000});\n\nlet hamburguerButton = await driver.findElement(By.xpath('//*[@id=\"headerWrapper\"]/div[1]/button[1]'))\nawait hamburguerButton.click()\n\nlet brandButton = await driver.findElement(By.xpath('//*[@id=\"menu\"]/div/div[2]/ul/li[7]/a'))\nawait brandButton.click()\n"})}),"\n",(0,s.jsx)(a.h3,{id:"puppeteer",children:"Puppeteer"}),"\n",(0,s.jsx)(a.p,{children:"Criado pela Google em ~2017 para fornecer automa\xe7\xe3o ao Google Chrome utilizando JavaScript."}),"\n",(0,s.jsx)(a.p,{children:"Note que o locator favorito deles envolve utilizar CSS."}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-javascript",metastring:'title="javascript"',children:"import puppeteer from \"puppeteer\";\n\nconst browser = await puppeteer.launch({headless: false})\nconst page = await browser.newPage()\n\nawait page.setViewport({ width: 1600, height: 1024 })\nawait page.goto('https://gringa.com.br/')\nawait page.locator('#section-header > div > div.Header__FlexItem.Header__FlexItem--fill.Header__FlexItem_left--mobile > nav > ul > li:nth-child(3) > a').click()\n"})}),"\n",(0,s.jsx)(a.h3,{id:"playwright",children:"Playwright"}),"\n",(0,s.jsx)(a.p,{children:"Criado pela Microsoft em ~2020 para fornecer automa\xe7\xe3o em diversos navegador. O estilo \xe9 bem parecido ao do Puppeteer pois boa parte dos desenvolvedores vieram do Puppeteer \ud83e\udd23."}),"\n",(0,s.jsx)(a.p,{children:"A linguagem prim\xe1ria de programa\xe7\xe3o dele \xe9 JavaScript, por\xe9m fornece suporte a diversas outras (n\xe3o necessariamente bem)."}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-javascript",metastring:'title="javascript"',children:"import { chromium, devices } from \"playwright\";\n\nconst browser = await chromium.launch({ channel: 'chrome', headless: false })\nconst context = await browser.newContext(devices['Desktop Chrome'])\nconst page = await context.newPage()\n\nawait page.goto('https://canseivendi.com.br/')\nawait page.getByRole('link', {name: 'Marcas'}).click()\n"})}),"\n",(0,s.jsx)(a.h2,{id:"raw",children:"Raw"}),"\n",(0,s.jsx)(a.p,{children:"Neste caso o mais importante \xe9 voc\xea possuir uma boa quantidade de bibliotecas que o ajudem a realizar a tarefa! O b\xe1sico \xe9 conseguir requisitar a p\xe1gina na internet e parsear o conte\xfado HTML."}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-python",metastring:'title="python"',children:'import httpx\nfrom parsel import Selector\n\nUSER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"\n\nresponse = httpx.get(\n    "https://canseivendi.com.br/bolsas",\n    headers={"user-agent": USER_AGENT},\n)\n\nselector = Selector(text=response.text)\nnames = selector.xpath(\'//div[@class="name"]/a/text()\').getall()\nlinks = selector.xpath(\'//div[@class="name"]/a/@href\').getall()\nprices = selector.xpath(\'//div[@class="cash"]/text()\').getall()\n'})}),"\n",(0,s.jsxs)(a.p,{children:["Neste exemplo escolhi utilizar a biblioteca ",(0,s.jsx)(a.a,{href:"https://github.com/encode/httpx",children:"httpx"})," (criada por ",(0,s.jsx)(a.a,{href:"https://www.encode.io/",children:"Encode"}),") e ",(0,s.jsx)(a.a,{href:"https://github.com/scrapy/parsel",children:"parsel"})," (criado por ",(0,s.jsx)(a.a,{href:"https://scrapy.org/",children:"Scrapy"}),"), mas fica a sua escolha as bibliotecas para as tarefas."]}),"\n",(0,s.jsxs)(a.admonition,{type:"note",children:[(0,s.jsx)(a.p,{children:"Navegadores fazem muito mais que apenas uma requisi\xe7\xe3o! Uma p\xe1gina leva uma rea\xe7\xe3o em cadeia de requisi\xe7\xf5es por conte\xfados delas."}),(0,s.jsxs)(a.p,{children:["Por exemplo, ao receber uma p\xe1gina HTML e o navegador identificar uma imagem nela (",(0,s.jsx)(a.code,{children:'<img src="photo.jpg">'}),"), ele precisa fazer uma requisi\xe7\xe3o dessa imagem ao site."]}),(0,s.jsx)(a.p,{children:"Agora imagina que isto acontece para diversos tipos de conte\xfados da p\xe1gina:"}),(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Imagens: ",(0,s.jsx)(a.code,{children:'<img src="myimage.jpg">'})]}),"\n",(0,s.jsxs)(a.li,{children:["Audio: ",(0,s.jsx)(a.code,{children:"<audio></audio>"})]}),"\n",(0,s.jsxs)(a.li,{children:["Videos: ",(0,s.jsx)(a.code,{children:"<video></video>"})]}),"\n",(0,s.jsxs)(a.li,{children:["CSS: ",(0,s.jsx)(a.code,{children:'<link rel="stylesheet" href="mystyle.css">'})]}),"\n",(0,s.jsxs)(a.li,{children:["JavaScript: ",(0,s.jsx)(a.code,{children:'<script src="myscripts.js"><\/script>'})]}),"\n",(0,s.jsxs)(a.li,{children:["Iframe: ",(0,s.jsx)(a.code,{children:'<iframe src="url"></iframe>'})]}),"\n"]})]}),"\n",(0,s.jsx)(a.h2,{id:"cat-and-mouse-game",children:"Cat and Mouse Game"}),"\n",(0,s.jsxs)(a.p,{children:["Ter os dados do seu site scrapeado por bots n\xe3o \xe9 algo bom, pois eles geram grande tr\xe1fego e nenhum lucro (n\xe3o estou falando de ",(0,s.jsx)(a.a,{href:"https://en.wikipedia.org/wiki/Ticket_resale#Automated_scalping_bots",children:"scalping"}),")."]}),"\n",(0,s.jsx)(a.p,{children:"Por isto \xe9 normal ver websites tentando identificar bots para bloquea-los e bots fingindo serem usu\xe1rios normais do dia a dia."}),"\n",(0,s.jsx)(a.p,{children:"Acontece que muitas vezes isso envolve simular comportamentos de um usu\xe1rio e simular um navegador, onde ambos n\xe3o s\xe3o tarefas f\xe1ceis."}),"\n",(0,s.jsxs)(a.p,{children:["Aqui uma lista ",(0,s.jsx)(a.strong,{children:"pequena"})," de coisas a se pensar:"]}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Simular Navegador","\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Construir Headers"}),"\n",(0,s.jsx)(a.li,{children:"Analisar HTML"}),"\n",(0,s.jsx)(a.li,{children:"Executar JavaScript"}),"\n",(0,s.jsx)(a.li,{children:"Variar fingerprint"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["Simular Usu\xe1rio","\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Resolver Captchas"}),"\n",(0,s.jsx)(a.li,{children:"Movimento do mouse"}),"\n",(0,s.jsx)(a.li,{children:"Velocidade digitando"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["Ap\xf3s ser bloqueado","\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:["Alterar comportamento/t\xe1tica","\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:"Para n\xe3o ser bloqueado novamente"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(a.li,{children:"Utilizar Proxy"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(a.p,{children:"Uma da melhor maneira de saber como atacar \xe9 sabendo como os sites se protegem... O que \xe9 algo que eu tenho pouco conhecimento ent\xe3o vou terminar aqui \ud83e\udd23."}),"\n",(0,s.jsx)(a.h2,{id:"references",children:"References"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsx)(a.li,{children:(0,s.jsx)(a.a,{href:"https://substack.thewebscraping.club/p/browser-fingerprinting-test-online",children:"https://substack.thewebscraping.club/p/browser-fingerprinting-test-online"})}),"\n"]})]})}function p(e={}){const{wrapper:a}={...(0,i.a)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,a,r)=>{r.d(a,{Z:()=>o,a:()=>t});var s=r(67294);const i={},n=s.createContext(i);function t(e){const a=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(n.Provider,{value:a},e.children)}}}]);