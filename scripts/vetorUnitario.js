'use strict';

function calcResultanteVetUnitario() {
  let vetUnitarioEls = document.getElementsByClassName('vetUn'),
      arrayComVetores = [];

  for (let vetor of vetUnitarioEls) {
    let objetoVetor = new VetorUnitario(vetor);
    arrayComVetores.push(objetoVetor);
  }

  exibirVetorResultante();

  let vetorResultante,
      vetUnResEl = document.querySelector('.vetUn-resultante');
  //--Calcula e atribui resultado da soma dos vetores unitarios #j    
  vetorResultante = VetorUnitario.soma(...arrayComVetores);
  //--Atualiza campos com valores apropriados #j
  vetUnResEl.querySelector('#resI').value = vetorResultante.i;
  vetUnResEl.querySelector('#resJ').value = vetorResultante.j;
  vetUnResEl.querySelector('#resK').value = vetorResultante.k;
  vetUnResEl.querySelector('.modulo').value = vetorResultante.modulo;
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
  label.textContent = 'Valor de k:';
  inputs = cria('input');
  inputs.value = 0;
  inputs.type = 'number';
  inputs.classList.add('compK');
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.textContent = 'Modulo:';
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
  document.getElementById('addUn').disabled = nmrVet === 5;
  document.getElementById('remUn').disabled = nmrVet === 2;
}
//--Controla exibiçao do vetor unitario resultante #J
function exibirVetorResultante() {
  let vetResEl = document.querySelector('.vetUn-resultante');
  if ( getComputedStyle(vetResEl).getPropertyValue('display') == 'none') {
    vetResEl.style.display = 'block';
  }
}