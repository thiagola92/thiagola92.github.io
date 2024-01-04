---
authors: thiagola92-derp
tags: [godot, gdscript, image, texture]
---

# Loading an image is simple

```gdscript
var sprite := Sprite2D.new()
sprite.texture = load("res://image.png") as Texture2D
```

```gdscript
var sprite := Sprite2D.new()
var image := Image.load_from_file("user://image.png")
sprite.texture = ImageTexture.create_from_image(image) as Texture2D
```

### Sprite2D

Sprite2D é um Node que já possui informações do que quer exibir e apenas fica responsável por administrar como exibir.  

O que ele quer exiber? Texture.

### Texture

Texture possui a informação daquilo que quer exibir e já foi carregado na placa de video.  

O que ele quer exibir? Image.

### Image

Image possui a informação daquilo que quer exibir e já foi carregado na memória RAM.

O que ele quer exibir? File.

### File

File possui os bytes daquilo que quer exibir porém ainda está no HD/SSD.

## `load()` vs `load_from_file()`

### load()

Utilizado para carregar imagens que foram comprimidas e armazenadas juntas ao executável do jogo (as imagens que você tem que referênciar com `res://`).  

Está função também mantém um cache das imagens carregadas, toda chamada irá retornar a mesma imagem já carregada anteriormente.  

### load_from_file()

Utilizado para carregar imagens novas, sem prévio conhecimento (imagens referênciadas com `user://` ou que você possui os bytes em uma variável).  

Está função **não** mantém cache, cada imagem gerada por ela irá ocupar mais espaço na memória.  


## References

- [Sprite2D](https://docs.godotengine.org/en/stable/classes/class_sprite2d.html)
    - [Godot code](https://github.com/godotengine/godot/blob/master/scene/2d/sprite_2d.h)
- [ImageTexture](https://docs.godotengine.org/en/stable/classes/class_imagetexture.html)
    - [Godot code](https://github.com/godotengine/godot/blob/master/scene/resources/image_texture.h)
- [Texture2D](https://docs.godotengine.org/en/stable/classes/class_texture2d.html)
    - [Godot code](https://github.com/godotengine/godot/blob/master/scene/resources/texture.h)
- [Texture](https://docs.godotengine.org/en/stable/classes/class_texture.html)
    - [Godot code](https://github.com/godotengine/godot/blob/master/scene/resources/texture.h)
- [Image](https://docs.godotengine.org/en/stable/classes/class_image.html)
    - [Godot code](https://github.com/godotengine/godot/blob/master/core/io/image.h)
- [ImageLoader Godot code](https://github.com/godotengine/godot/blob/master/core/io/image_loader.h)
