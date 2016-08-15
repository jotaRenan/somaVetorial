'use strict';

function calcResultanteVetUnitario() {
  let vetUnitarioEls = document.getElementsByClassName('vetUn'),
      vetUnResEl = document.querySelector('.vetUn-resultante'),
      //--Valores dos componentes inseridos por usuario #j
      compI = [],
      compJ = [],
      //--Componentes resultantes #j
      resultanteComponenteI,
      resultanteComponenteJ;

  for ( let vetorUnitario of vetUnitarioEls) {
    //---Vai colocando, nos arrays, os valores inseridos. #j
    let valorCompI = parseFloat(vetorUnitario.querySelector('.compI').value),
        valorCompJ = parseFloat(vetorUnitario.querySelector('.compJ').value);
    //---Verifica se usuario deseja subtrair ao inves de adicionar
    if (vetorUnitario.querySelector('.cbx-subtracao-un').checked) {
      valorCompI *= (-1);
      valorCompJ *= (-1);
    }
    compI.push(valorCompI);
    compJ.push(valorCompJ);
  }
  //---Soma os valores das componentes #j
  let componenteIResultado = calcTotal(compI),
      componenteJResultado = calcTotal(compJ),
      moduloVetorResultante;

  //---Exibe valores das componentes #j
  resultanteComponenteI = vetUnResEl.querySelector('#resI');
  resultanteComponenteI.value = componenteIResultado;
  resultanteComponenteJ = vetUnResEl.querySelector('#resJ');
  resultanteComponenteJ.value = componenteJResultado;
  //---Calcula e exibe modulo do vetor resultante #j
  moduloVetorResultante = Math.sqrt( Math.pow(componenteJResultado, 2) + 
    Math.pow(componenteIResultado, 2) );
  vetUnResEl.querySelector('.modulo').value = round(moduloVetorResultante, 3);
}

function calcTotal(comp) {
  let total = 0;
  for (let componente of comp) {
    total += componente;
  }
  return total;
}

function acrescentarVetUn() {
  /*  Essa funcao permite a geracao dinamica de campos para o usuario inserirmais
   *  vetores unitarios. Cria-se cada elemento no DOM e cada um eh concatenado
   *  ao documento. #j
  */
  let label, inputs,
      section = cria('section'),
      titulo = cria('h3');

  const numeroDoProximoVetor = (document.getElementsByClassName('vetUn').length + 1);

  section.classList.add('vetUn');
  titulo.textContent = `Vetor ${numeroDoProximoVetor}`;
  section.appendChild(titulo);

  label = cria('label');
  label.textContent = 'Subtração';
  inputs = cria('input');
  inputs.type = 'checkbox';
  inputs.classList.add('cbx-subtracao-un');
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  inputs = cria('input');
  label.textContent = 'Valor de î:';
  inputs.value = 0;
  inputs.type = 'number';
  inputs.classList.add('compI');
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.textContent = 'Valor de j:';
  inputs = cria('input');
  inputs.value = 0;
  inputs.type = 'number';
  inputs.classList.add('compJ');
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.textContent = 'Valor de u:';
  inputs = cria('input');
  inputs.disabled = 'true';
  label.appendChild(inputs);
  section.appendChild(label);

  const vetUnEls = document.getElementsByClassName('vetUn');
  insertAfter(section, vetUnEls[vetUnEls.length-1]);
  controlaAdicaoRemocaoVetUn();
  
}

function removerVetUn() {
  let vetUnEl = document.getElementById('vetores-unitarios');
  vetUnEl.removeChild(vetUnEl.querySelector('.vetUn:last-child'));
  controlaAdicaoRemocaoVetUn();
}

function cria(el) {
  return document.createElement(el);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/*  Definido um limite de vetores, controla os botoes de Adicionar Vetor e
      Remover Vetor. #j
  */
function controlaAdicaoRemocaoVetUn() {
  const nmrVet = document.getElementsByClassName('vetUn').length;
  document.getElementById('addUn').disabled = nmrVet === 2;
  document.getElementById('remUn').disabled = nmrVet === 5;
}