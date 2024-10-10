---
authors: thiagola92
tags: [web, scraping, scrapers, crawlers, crawler, browser, html, http, css, xpath, puppeteer, playwright, selenium]
---

# Web Crawler
**Crawler**: Responsável por navegar entre websites utilizando links encontrados neles mesmos  
**Scraper**: Responsável por extrair informações importantes dos websites navegados  

Crawling é essêncial para scraping, pois você não tem como conseguir extrair informações de um site sem navegar para ele antes.  
Scraping não é essêncial para crawling, pois os dados do site podem ser irrelevantes para você.  

Por exemplo:  
- Google utiliza um crawler para navegar a internet e indexar páginas delas, porém não extrai as informações dos websites em si
- OpenAI utiliza scraper para pegar os videos do youtube e utilizar na inteligência artificial deles

Se eu tivesse que separar crawlers em categorias, seria:
- **Browser**: Utilizando um browser real para crawlear
- **Raw**: Simulando um browser atráves de requisições pela internet

Hoje em dia simular um navegador é incrivelmente difícil então a maneira **raw** é bem menos potente e fornece muito menos funcionalidades.  

## Browser
Existem 3 ferramentas famosas de automação de navegadores:  
- [Selenium](https://www.selenium.dev/)
- [Puppeteer](https://pptr.dev/)
- [Playwright](https://playwright.dev/)

É importante notar que elas todas se declaram para usos de testes, porém ainda assim são muito utilizadas para web scraping.  

### Selenium
Criado em ~2004 mas que continua a oferecer suporte para todos os navegadores e diversas linguagens (não necessariamente bem).  

Muito do seu estilo vem do fato de ter sido criado utilizando Java e depois adaptado para outras linguagens.  

```javascript title="javascript"
import { Browser, Builder, By } from "selenium-webdriver";

const driver = await new Builder().forBrowser(Browser.CHROME).build()
await driver.get('https://www.etiquetaunica.com.br/')
await driver.manage().setTimeouts({implicit: 1000});

let hamburguerButton = await driver.findElement(By.xpath('//*[@id="headerWrapper"]/div[1]/button[1]'))
await hamburguerButton.click()

let brandButton = await driver.findElement(By.xpath('//*[@id="menu"]/div/div[2]/ul/li[7]/a'))
await brandButton.click()
```

### Puppeteer
Criado pela Google em ~2017 para fornecer automação ao Google Chrome utilizando JavaScript.  

Note que o locator favorito deles envolve utilizar CSS.  

```javascript title="javascript"
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({headless: false})
const page = await browser.newPage()

await page.setViewport({ width: 1600, height: 1024 })
await page.goto('https://gringa.com.br/')
await page.locator('#section-header > div > div.Header__FlexItem.Header__FlexItem--fill.Header__FlexItem_left--mobile > nav > ul > li:nth-child(3) > a').click()
```

### Playwright
Criado pela Microsoft em ~2020 para fornecer automação em diversos navegador. O estilo é bem parecido ao do Puppeteer pois boa parte dos desenvolvedores vieram do Puppeteer 🤣.  

A linguagem primária de programação dele é JavaScript, porém fornece suporte a diversas outras (não necessariamente bem).  

```javascript title="javascript"
import { chromium, devices } from "playwright";

const browser = await chromium.launch({ channel: 'chrome', headless: false })
const context = await browser.newContext(devices['Desktop Chrome'])
const page = await context.newPage()

await page.goto('https://canseivendi.com.br/')
await page.getByRole('link', {name: 'Marcas'}).click()
```

## Raw
Neste caso o mais importante é você possuir uma boa quantidade de bibliotecas que o ajudem a realizar a tarefa, porém o básico é conseguir requisitar a página na internet e parsear o conteúdo HTML.  

```python title="python"
import httpx
from parsel import Selector

USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"

response = httpx.get(
    "https://canseivendi.com.br/bolsas",
    headers={"user-agent": USER_AGENT},
)

selector = Selector(text=response.text)
names = selector.xpath('//div[@class="name"]/a/text()').getall()
links = selector.xpath('//div[@class="name"]/a/@href').getall()
prices = selector.xpath('//div[@class="cash"]/text()').getall()
```

Note que navegadores fazem muito mais que apenas uma requisição, pois uma página pode envolver fazer diversas requisições (por imagens, videos, códigos javascripts, etc).  