- Organizar os arquivos em pastas
  - [x] pasta `imgs`
  - [x] pasta `styles`
  - [x] pasta `scripts`
  - [x] alterar os arquivos `.html` para apontar para os arquivos dentro das pastas
- Passar a usar algumas funcionalidades de es2015 (JavaScript 6)
  - [x] [`for..of`][for-of] em vez do `for(;;)` tradicional
  - [x] [`const`/`let`][const-let] em vez de `var` sempre que possível
  - [x] [`elemento.classList.add('nome-da-classe')`][classlist] em vez de `elemento.className='nome-da-classe'`
  - [x] usar interpolação de _strings_ via [_template strings_][templates]. E.g., em vez do seguinte:
  
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
  - [x] padronizar uso de áspas para _strings_ (sugiro sempre usar áspas simples em vez de duplas)
  - [ ] usar nomes de variáveis e funções mais descritivos
  - [ ] usar algum padrão de projeto para aumentar a organização em módulos ([_module pattern_][module], [_revealing module pattern_][rmodule] etc.)

- Sugestoes do Ronaldo
  - [x] adicionar eixo K nos vetores unitários
  - [x] permitir usuário escolher quantidade de algarismos significativos
  - [ ] fazer tutorial de como utilizar a aplicação (sugestao: uso de gifs, como nas propagandas do [Sublime text][sublime-text].)
  - [x] substituir 'U' por 'módulo'
  - [ ] Calcular ângulo unitario utilizando trigonometria:
    
    ```js
    arctg (i/j);
    ```
- Finalização e otimização do código e material
  - [ ] finalizar uso de localStorage
  - [x] otimizar cálculos com vetores padrão :worried:
  - [ ] permitir melhor modularização dos calculos com vetores unit. padrão :frowning:
  - [ ] incluir exercícios
  - [ ] posicionar checkboxes e inputs adequadamente em relação às label
  - [ ] *~~reorganizar a função de cálculo da resultante dos ângulos de forma a ordenar o array inicialmente (sendo a primeira posição o maior valor), otimizando o código e evitando verificações repetitivas~~*
  - [x] colocar uma checkbox para cada vetor

- Detalhes
  - [ ] criar logotipo
  - [ ] escolher esquema de cores
  - [ ] incluir orientador e coorientador na pagina 'quem somos' :star:

[for-of]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for...of
[const-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[classlist]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
[templates]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[module]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
[rmodule]: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
[sublime-text]: https://sublimetext.com
