"use strict";(self.webpackChunkthiagola_92_github_io=self.webpackChunkthiagola_92_github_io||[]).push([[383],{5405:(e,i,r)=>{r.r(i),r.d(i,{assets:()=>l,contentTitle:()=>o,default:()=>g,frontMatter:()=>t,metadata:()=>n,toc:()=>d});var a=r(5893),s=r(1151);const t={authors:"thiagola92-derp",tags:["godot","gdscript","image","texture"]},o="Loading an image is simple",n={permalink:"/blog/2023/11/09/load-image-simple",editUrl:"https://github.com/thiagola92/thiagola92.github.io/tree/master/blog/2023-11-09-load-image-simple/index.md",source:"@site/blog/2023-11-09-load-image-simple/index.md",title:"Loading an image is simple",description:"Sprite2D",date:"2023-11-09T00:00:00.000Z",formattedDate:"November 9, 2023",tags:[{label:"godot",permalink:"/blog/tags/godot"},{label:"gdscript",permalink:"/blog/tags/gdscript"},{label:"image",permalink:"/blog/tags/image"},{label:"texture",permalink:"/blog/tags/texture"}],hasTruncateMarker:!1,authors:[{name:"Thiago Lages de Alencar",title:"Desenvolvedor de Software",url:"https://github.com/thiagola92",imageURL:"https://media.discordapp.net/attachments/807746464833863709/1110163082984034334/discord.png",key:"thiagola92-derp"}],frontMatter:{authors:"thiagola92-derp",tags:["godot","gdscript","image","texture"]},unlisted:!1,prevItem:{title:"Least vs Most significant bit",permalink:"/blog/2023/11/27/most-and-least-significant-bit"},nextItem:{title:"Mondot",permalink:"/blog/2023/10/09/mondot"}},l={authorsImageUrls:[void 0]},d=[{value:"Sprite2D",id:"sprite2d",level:3},{value:"Texture",id:"texture",level:3},{value:"Image",id:"image",level:3},{value:"File",id:"file",level:3},{value:"<code>load()</code> vs <code>load_from_file()</code>",id:"load-vs-load_from_file",level:2},{value:"load()",id:"load",level:3},{value:"load_from_file()",id:"load_from_file",level:3},{value:"References",id:"references",level:2}];function c(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-gdscript",children:'var sprite := Sprite2D.new()\nsprite.texture = load("res://image.png") as Texture2D\n'})}),"\n",(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:"language-gdscript",children:'var sprite := Sprite2D.new()\nvar image := Image.load_from_file("user://image.png")\nsprite.texture = ImageTexture.create_from_image(image) as Texture2D\n'})}),"\n",(0,a.jsx)(i.h3,{id:"sprite2d",children:"Sprite2D"}),"\n",(0,a.jsx)(i.p,{children:"Sprite2D \xe9 um Node que j\xe1 possui informa\xe7\xf5es do que quer exibir e apenas fica respons\xe1vel por administrar como exibir."}),"\n",(0,a.jsx)(i.p,{children:"O que ele quer exiber? Texture."}),"\n",(0,a.jsx)(i.h3,{id:"texture",children:"Texture"}),"\n",(0,a.jsx)(i.p,{children:"Texture possui a informa\xe7\xe3o daquilo que quer exibir e j\xe1 foi carregado na placa de video."}),"\n",(0,a.jsx)(i.p,{children:"O que ele quer exibir? Image."}),"\n",(0,a.jsx)(i.h3,{id:"image",children:"Image"}),"\n",(0,a.jsx)(i.p,{children:"Image possui a informa\xe7\xe3o daquilo que quer exibir e j\xe1 foi carregado na mem\xf3ria RAM."}),"\n",(0,a.jsx)(i.p,{children:"O que ele quer exibir? File."}),"\n",(0,a.jsx)(i.h3,{id:"file",children:"File"}),"\n",(0,a.jsx)(i.p,{children:"File possui os bytes daquilo que quer exibir por\xe9m ainda est\xe1 no HD/SSD."}),"\n",(0,a.jsxs)(i.h2,{id:"load-vs-load_from_file",children:[(0,a.jsx)(i.code,{children:"load()"})," vs ",(0,a.jsx)(i.code,{children:"load_from_file()"})]}),"\n",(0,a.jsx)(i.h3,{id:"load",children:"load()"}),"\n",(0,a.jsxs)(i.p,{children:["Utilizado para carregar imagens que foram comprimidas e armazenadas juntas ao execut\xe1vel do jogo (as imagens que voc\xea tem que refer\xeanciar com ",(0,a.jsx)(i.code,{children:"res://"}),")."]}),"\n",(0,a.jsx)(i.p,{children:"Est\xe1 fun\xe7\xe3o tamb\xe9m mant\xe9m um cache das imagens carregadas, toda chamada ir\xe1 retornar a mesma imagem j\xe1 carregada anteriormente."}),"\n",(0,a.jsx)(i.h3,{id:"load_from_file",children:"load_from_file()"}),"\n",(0,a.jsxs)(i.p,{children:["Utilizado para carregar imagens novas, sem pr\xe9vio conhecimento (imagens refer\xeanciadas com ",(0,a.jsx)(i.code,{children:"user://"})," ou que voc\xea possui os bytes em uma vari\xe1vel)."]}),"\n",(0,a.jsxs)(i.p,{children:["Est\xe1 fun\xe7\xe3o ",(0,a.jsx)(i.strong,{children:"n\xe3o"})," mant\xe9m cache, cada imagem gerada por ela ir\xe1 ocupar mais espa\xe7o na mem\xf3ria."]}),"\n",(0,a.jsx)(i.h2,{id:"references",children:"References"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:"https://docs.godotengine.org/en/stable/classes/class_sprite2d.html",children:"Sprite2D"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:"https://github.com/godotengine/godot/blob/master/scene/2d/sprite_2d.h",children:"Godot code"})}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:"https://docs.godotengine.org/en/stable/classes/class_imagetexture.html",children:"ImageTexture"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:"https://github.com/godotengine/godot/blob/master/scene/resources/image_texture.h",children:"Godot code"})}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:"https://docs.godotengine.org/en/stable/classes/class_texture2d.html",children:"Texture2D"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:"https://github.com/godotengine/godot/blob/master/scene/resources/texture.h",children:"Godot code"})}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:"https://docs.godotengine.org/en/stable/classes/class_texture.html",children:"Texture"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:"https://github.com/godotengine/godot/blob/master/scene/resources/texture.h",children:"Godot code"})}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:"https://docs.godotengine.org/en/stable/classes/class_image.html",children:"Image"}),"\n",(0,a.jsxs)(i.ul,{children:["\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:"https://github.com/godotengine/godot/blob/master/core/io/image.h",children:"Godot code"})}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:"https://github.com/godotengine/godot/blob/master/core/io/image_loader.h",children:"ImageLoader Godot code"})}),"\n"]})]})}function g(e={}){const{wrapper:i}={...(0,s.a)(),...e.components};return i?(0,a.jsx)(i,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},1151:(e,i,r)=>{r.d(i,{Z:()=>n,a:()=>o});var a=r(7294);const s={},t=a.createContext(s);function o(e){const i=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function n(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),a.createElement(t.Provider,{value:i},e.children)}}}]);