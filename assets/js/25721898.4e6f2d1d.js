"use strict";(self.webpackChunkthiagola_92_github_io=self.webpackChunkthiagola_92_github_io||[]).push([[8131],{8290:(e,r,a)=>{a.r(r),a.d(r,{assets:()=>d,contentTitle:()=>t,default:()=>u,frontMatter:()=>n,metadata:()=>i,toc:()=>l});var o=a(85893),s=a(11151);const n={authors:"thiagola92-derp",tags:["godot","gdscript","array"]},t="GDScript Array",i={permalink:"/blog/2023/02/16/gdscript-array",editUrl:"https://github.com/thiagola92/thiagola92.github.io/tree/master/blog/2023-02-16-gdscript-array/index.md",source:"@site/blog/2023-02-16-gdscript-array/index.md",title:"GDScript Array",description:"Em vez de focar no que eu deveria para fazer um jogo, eu me distrai tentando ganhar desempenho onde n\xe3o precisava...",date:"2023-02-16T00:00:00.000Z",formattedDate:"February 16, 2023",tags:[{label:"godot",permalink:"/blog/tags/godot"},{label:"gdscript",permalink:"/blog/tags/gdscript"},{label:"array",permalink:"/blog/tags/array"}],hasTruncateMarker:!1,authors:[{name:"Thiago Lages de Alencar",title:"Desenvolvedor de Software",url:"https://github.com/thiagola92",imageURL:"https://media.discordapp.net/attachments/807746464833863709/1110163082984034334/discord.png",key:"thiagola92-derp"}],frontMatter:{authors:"thiagola92-derp",tags:["godot","gdscript","array"]},unlisted:!1,prevItem:{title:"GDScript RefCounted",permalink:"/blog/godot-refcounted"},nextItem:{title:"Git Book",permalink:"/blog/2023/02/08/git-book"}},d={authorsImageUrls:[void 0]},l=[{value:"Note",id:"note",level:2}];function c(e){const r={a:"a",blockquote:"blockquote",code:"code",h2:"h2",hr:"hr",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.p,{children:"Em vez de focar no que eu deveria para fazer um jogo, eu me distrai tentando ganhar desempenho onde n\xe3o precisava..."}),"\n",(0,o.jsx)(r.hr,{}),"\n",(0,o.jsxs)(r.p,{children:["Eu pretendia ter um Array de ",(0,o.jsx)(r.a,{href:"https://en.wikipedia.org/wiki/Status_effect",children:"buffs"})," e a ideia era verificar se cada um dos buffs j\xe1 expirou para remover quando eles acabassem. Primeira coisa que pensei foi em percorrer ele e ir removendo um a um os que expiraram."]}),"\n",(0,o.jsxs)(r.p,{children:["Conforme fui olhando a documenta\xe7\xe3o de ",(0,o.jsx)(r.a,{href:"https://docs.godotengine.org/en/stable/classes/class_array.html",children:"Array"})," percebi um desafio que me chamou aten\xe7\xe3o... Remo\xe7\xe3o pode ser custoso:"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-gdscript",children:"void\xa0erase\xa0(Variant\xa0value)\n"})}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsx)(r.p,{children:"Note: On large arrays, this method will be slower if the removed element is close to the beginning of the array (index 0). This is because all elements placed after the removed element have to be reindexed."}),"\n"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-gdscript",children:"void\xa0remove\xa0(int\xa0position)\n"})}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsx)(r.p,{children:"Note: On large arrays, this method will be slower if the removed element is close to the beginning of the array (index 0). This is because all elements placed after the removed element have to be reindexed."}),"\n"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-gdscript",children:"Variant\xa0pop_front()\n"})}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsx)(r.p,{children:"Note: On large arrays, this method is much slower than pop_back as it will reindex all the array's elements every time it's called. The larger the array, the slower pop_front will be."}),"\n"]}),"\n",(0,o.jsx)(r.p,{children:"Primeiro fiz o c\xf3digo mais simples para isto, juntar todos que expiraram e depois remove-los um a um:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-gdscript",children:"var expired: Array[Buff] = []\n\nfor buff in _buffs:\n    if buff.timeout():\n        expired.append(buff)\n\nfor buff in expired:\n    _buffs.erase(buff)\n"})}),"\n",(0,o.jsx)(r.p,{children:"Pensei nisto porque sei que n\xe3o posso remover elementos do Array enquanto o percorro, isso iria causar uma bagun\xe7a durante o processo (pode fazer com que voc\xea pule elementos enquanto percorre e reindexia)."}),"\n",(0,o.jsx)(r.p,{children:"Mas o que eu aprendi em uma aula da faculdade \xe9 que posso evitar este problema se eu percorrer o Array de tr\xe1s para frente (apenas use isso se voc\xea n\xe3o liga para a ordem em que os elementos v\xe3o ser removidos)."}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-gdscript",children:"for in in range(_buffs.size() -1, -1, -1):\n    if _buffs[i].timeout():\n        _buffs.erase(_buffs[i])\n"})}),"\n",(0,o.jsx)(r.p,{children:"Bem mais r\xe1pido que a vers\xe3o anterior e o Godot ainda consegue me sugerir os m\xe9todos a serem usados de cada elementos (pois eu usei tipagem no Array)."}),"\n",(0,o.jsx)(r.p,{children:"N\xe3o satisfeito com o fato que reindexar tem um custo grande, resolvi fazer mais uma tentativa:"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-gdscript",children:"var up_to_date: Array[Buff] = []\n\nfor buff in _buffs:\n    if not buff.timeout():\n        up_to_date.append(buff)\n\n_buffs = up_to_date\n"})}),"\n",(0,o.jsx)(r.p,{children:"Em vez de me preocupar em remover, apenas anoto os buffs bons para depois sobreescrever o Array."}),"\n",(0,o.jsxs)(r.p,{children:["Lado positivo: ",(0,o.jsx)(r.code,{children:"append()"})," \xe9 bem mais barato que ",(0,o.jsx)(r.code,{children:"erase()"})," pois n\xe3o precisa reindexar."]}),"\n",(0,o.jsxs)(r.p,{children:["Cada uma dessas maneira melhorou para quando eu precisava remover ",(0,o.jsx)(r.strong,{children:"MUITOS"})," elementos de um Array ",(0,o.jsx)(r.strong,{children:"MUITO"})," grande."]}),"\n",(0,o.jsx)(r.p,{children:"Por exemplo, no caso de um Array com 5k ok e 5k precisando ser removidos a diferen\xe7a foi de 648117\xb5s para 2286\xb5s (at\xe9 eu estou me perguntando se eu medi corretamente isto pq isso seria um aumento de 28.000%?)"}),"\n",(0,o.jsx)(r.p,{children:"Voltando para a realidade... Isto n\xe3o \xe9 um caso normal e as chances disso acontecer em um jogo \xe9 quase imposs\xedvel (at\xe9 para MMORPG 5k buffs \xe9 muito)."}),"\n",(0,o.jsx)(r.p,{children:"Pelo lado positivo est\xe1 fun\xe7\xe3o n\xe3o \xe9 custosa, mesmo nos casos pequenos ela chega a ter o custo de 0~100% a mais que anterior."}),"\n",(0,o.jsx)(r.h2,{id:"note",children:"Note"}),"\n",(0,o.jsxs)(r.p,{children:["Depois de tudo isso eu pensei... eu n\xe3o deveria estar dando ",(0,o.jsx)(r.code,{children:"queue_free()"})," nestes meus Nodes? \ud83e\udd14"]}),"\n",(0,o.jsxs)(r.p,{children:["N\xe3o era mais f\xe1cil deixar que os Nodes dessem ",(0,o.jsx)(r.code,{children:"queue_free()"})," neles mesmo quando dessem timeout? \ud83e\udd14"]})]})}function u(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},11151:(e,r,a)=>{a.d(r,{Z:()=>i,a:()=>t});var o=a(67294);const s={},n=o.createContext(s);function t(e){const r=o.useContext(n);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),o.createElement(n.Provider,{value:r},e.children)}}}]);