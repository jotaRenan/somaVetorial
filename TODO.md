- Organizar os arquivos em pastas
  - [ ] pasta `imgs`
  - [ ] pasta `styles`
  - [ ] pasta `scripts`
  - [ ] alterar os arquivos `.html` para apontar para os arquivos dentro das pastas
- Passar a usar algumas funcionalidades de es2015 (JavaScript 6)
  - [ ] [`for..of`][for-of] em vez do `for(;;)` tradicional
  - [ ] [`const`/`let`][const-let] em vez de `var` sempre que possível
  - [ ] [`elemento.classList.add('nome-da-classe')`][classlist] em vez de `elemento.className='nome-da-classe'`
  - [ ] usar interpolação de _strings_ via [_template strings_][templates]. E.g., em vez do seguinte:
  
    ```js
    titulo.innerHTML = "Vetor " + (document.getElementsByClassName('vetUn').length + 1);
    ```
    ...prefira:
    
    ```js
    let numeroDoProximoVetor = (document.getElementsByClassName('vetUn').length + 1);
    titulo.innerHTML = `Vetor ${numeroDoProximoVetor}`;   // repare que delimitamos o texto
                                                          // usando crase: `texto ${variavel}`
    ```
- Padronização/estilo/organização de código
  - [ ] padronizar uso de áspas para _strings_ (sugiro sempre usar áspas simples em vez de duplas)
  - [ ] usar nomes de variáveis e funções mais descritivos
  - [ ] usar algum padrão de projeto para aumentar a organização em módulos ([_module pattern_][module], [_revealing module pattern_][rmodule] etc.)



[for-of]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for...of
[const-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[classlist]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
[templates]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[module]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
[rmodule]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript