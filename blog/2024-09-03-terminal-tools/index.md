---
authors: thiagola92
tags: [terminal, tools]
---

# Terminal Tools
Está é uma lista com minha opnião sobre diversas ferramentas de terminal.  
Aqueles marcados com estrela (⭐) são ainda utilizados por mim.  

## CLI
- [nala](https://gitlab.com/volian/nala) ⭐
    - **Substitui**: `apt`
    - **Uso diário**: Alto
    - **Nota**: Torna muito melhor a visualização e entendimento da instalação de programas
- [duf](https://github.com/muesli/duf)
    - **Substitui**: `df`
    - **Uso diário**: Baixo
    - **Nota**: Praticamente nunca uso pois acabo olhando em GUIs essas informações
- [dust](https://github.com/bootandy/dust)
    - **Substitui**: `du`
    - **Uso diário**: Baixo
    - **Nota**: Praticamente nunca uso pois acabo olhando em GUIs essas informações
- [fastfetch](https://github.com/fastfetch-cli/fastfetch) ⭐
    - **Substitui**: `neofetch`
    - **Uso diário**: Baixo
    - **Nota**: Providência mais informação e o projeto não foi abandonado
- [jq](https://jqlang.github.io/jq/)
    - **Substitui**: ---
    - **Uso diário**: Baixo
    - **Nota**: Praticamente nunca uso pois trato JSON por código

## TUI
- [bottom](https://github.com/ClementTsang/bottom)
    - **Substitui**: `htop`, `top`
    - **Uso diário**: Baixo
    - **Nota**: Praticamente nunca uso pois é muito chato ter que lembrar de todos os atalhos, acabo voltando para `htop`
- [superfile](https://superfile.netlify.app/)
    - **Substitui**: ---
    - **Uso diário**: Baixo
    - **Nota**: Nunca uso pois dificilmente tenho necessidade de usar file manager no terminal
- [yazi](https://github.com/sxyazi/yazi)
    - **Substitui**: ---
    - **Uso diário**: Baixo
    - **Nota**: Nunca uso pois dificilmente tenho necessidade de usar file manager no terminal
- [micro](https://micro-editor.github.io/) ⭐
    - **Substitui**: `nano`
    - **Uso diário**: Alto
    - **Nota**: Muito mais parecido com um editor de texto do dia a dia

## Shells
- [fish](https://fishshell.com/)
    - **Substitui**: `bash`
    - **Nota 1**: Providência uma ótima experiência logo de cara
    - **Nota 2**: Sintaxe melhor que `bash` porém ainda não da vontade de aprender
- [nushell](https://www.nushell.sh/) ⭐
    - **Substitui**: `bash`, `fish`
    - **Nota 1**: Providência uma ótima experiência logo de cara
    - **Nota 2**: Sintaxe muito mais agradável
    - **Nota 3**: Remove a necessidade de possuir `jq`
    - **Nota 4**: Remove a necessidade de possuir `curl` pois possui o comando `http`
    - **Nota 5**: Remove a necessidade de possuir `df`/`duf` pois possui o comando `sys disks`

Em shells "uso diário" é 100% de quando você utilizar o shell, então sempre é alto.  

## Prompt
- [Starship](https://starship.rs/) ⭐
    - **Opnião 1**: Permite grande costumização do prompt com facilidade, tornando o prompt mais agradável
    - **Opnião 2**: Quando lidando com Git possue um peso considerativo

Em prompts "subsititui" é sempre sobre substituir o padrão.  
Em prompts "uso diário" é 100% de quando você utilizar o shell, então sempre é alto.  

## References
- https://terminalroot.com/list-of-30-modern-alternatives-to-unix-commands/  
- https://gabevenberg.com/posts/cli-renaissance/  