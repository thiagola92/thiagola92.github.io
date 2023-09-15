---
slug: godot-refcounted
title: GDScript RefCounted
authors: thiagola92-calm
tags: [godot, gdscript, refcounted]
---

# GDScript RefCounted

Eu passei um dia inteiro curioso para saber o como funcionava contagem por referência no GDScript (não o conceito mas sim os detalhes tecnicos). Triste por ver que a documentação não conseguiu tirar as dúvidas que eu tinha e até pensei que só saberia mais testando ou olhando o código em C++.

Até que por acaso esbarrei em um comentário de um video que simplesmente explica **muito** bem.


> I've been following along in the course, but this particular video contains a lot of misinformation about Godot's internals. I'll clarify below:
> 
> All variables defined in Godot's scripting API are wrapped in an object called a Variant. Each Variant is capable of storing different data types (int, string, bool, Object, Array, Dictionary, Color, Transform, etc.). You can see a list of the supported types `TYPE_*` enum values in the @GlobalScope class API documentation. This Variant class is why GDScript is able to change variable data types dynamically. Internally, every variable is a Variant. When you specify that a variable is typed and can only contain a single type, it is the GDScript language implementation, not Godot Engine, that blocks the type change.
> 
> Now, if a Variant B is assigned to another Variant A, then MOST of the time, the B's value is "copied by value", meaning that the direct value is copied from B to A. There is no reference counting of any kind. They are primitive values. In fact, reference counting primitive values is generally a waste of time and less performant than just copying them directly. This is because, for reference counting, you have to pass around a memory address in order to refer to the variable (because there is only one instance of the variable), and then getting the variable involves looking up the memory address. But for primitive numeric values such as int, float, or bool, passing the direct value takes just as much memory (less than 64 bits or 8 bytes) as passing a memory address. And if you pass a direct value, then the other Variant doesn't have to look up the value in the first place; they already have it.
> 
> There are only three data types in Godot 3.2.x and prior that "copy by reference", i.e. pass a memory address when assigning to a new variable: Object, Array, and Dictionary. EVERYTHING else will copy by value. In Godot 4.0 and beyond, the various Pool*Array classes, such as PoolIntArray, PoolStringArray, etc., will also be updated to copy by reference. With "copy by reference" data types, if you create one of those values and assign it to two variables, then modifying either one of the variables' values will modify both variables' values, since they both refer to the same memory address.
> 
> ```
> var x = [1, 2, 3]
> var y = x
> x.push_back(4) # y is now also [1,2,3,4]
> ```
> 
> As for reference counting, that is ONLY supported in Object classes that extend the Reference class. The top of the class hierarchy looks a bit like this...
> 
> - Object  
>   - Node  
>     - CanvasItem  
>       - Node2D  
>       - Control  
>     - Spatial  
>   - Reference  
>     - Resource  
> 
> So, Object has only direct new/free methods for allocating and deleting memory. Node and its subtypes can allocate memory, but 1) they can `.free()` immediately just like Objects or `.queue_free()` to schedule their deletion till the next frame (where you can more safely delete a large group of nodes at once), and 2) if you delete a Node, it also deletes all of that Node's children, so an entire tree of nodes can be deleted just by deleting the root node of that tree. With Reference, you never delete it directly. It just auto-deletes when you stop having any references to it due to the fact that it actually DOES do reference-counting.
> 
> ```
> var ref = Reference.new()
> ref = null # the Reference object has now been freed
> ```
> 
> Resources behave just like References, except in their case, they can track their reference by their filepath as well. That is, if you do `load("res://my_file.gd")`, then you may end up loading a cached instance rather than allocating an entirely new object. If the engine's internal ResourceCache finds that the resource has already been loaded, then the `load()` function will just return the memory address of the existing object rather than creating a new one.
> 
> Also note that the practice of creating an object pool for nodes and the like can be useful, but for different reasons than in other engines. This topic is quite advanced for people who may be learning programming for the first time, but: in stuff like C# (Unity), memory is "garbage collected", i.e. the program tracks memory for you and auto-deletes it on your behalf. This can lead to random pauses in a game if the garbage collector suddenly starts up and interrupts gameplay to clean up memory. Object pooling, i.e. creating a group of objects and then just cycling through them rather than deleting and creating constantly, was a strategy to re-use existing memory for objects so as to stop the garbage collector from needing to run in the first place. But Godot does memory allocation manually and in small increments. It is designed in such a way that constantly creating and deleting objects doesn't lead to long-term memory fragmentation, i.e. it doesn't mess up your computer. You can read about this in the "development" section of the official documentation. Anyway, object pooling IS useful if, for performance reasons, you don't want to waste TIME deleting and creating large objects, but you won't need to worry about stuttering or memory issues, so most of the time, it's perfectly fine in Godot to just create and delete objects as you need them.

*Algumas adaptações foram feitas para melhorar aleitura (adicionar nova linha, transformar em bullet points, etc) mas nenhuma alteração em palavras ou frases foram feitas.

## Reference

Video com este comentário: https://www.youtube.com/watch?v=9LaB6wbZepg  

Canal de quem comentou: https://www.youtube.com/channel/UC7uU5XaPB9uYKlowYOhEHnA  

