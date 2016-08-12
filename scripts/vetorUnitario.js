'use strict';

function calcResultanteVetUnitario() {
  let vetUnitarioEls = document.getElementsByClassName('vetUn'),
      vetUnRes = document.getElementsByClassName('vetUn-resultante')[0],
      //--Valores dos componentes inseridos por usuario
      compI = [],
      compJ = [],
      //--Componentes resultantes
      resultanteComponenteI,
      resultanteComponenteJ;

  for ( let vetorUnitario of vetUnitarioEls) {
    //---Vai colocando, nos arrays, os valores inseridos. 
    compI.push(parseFloat(vetorUnitario.querySelector('.compI').value));
    compJ.push(parseFloat(vetorUnitario.querySelector('.compJ').value));
  }
  //---Soma os valores e exibe resultado.
  resultanteComponenteI = vetUnRes.querySelector('.resI');
  resultanteComponenteI.value = calcTotal(compI);

  resultanteComponenteJ = vetUnRes.querySelector('.resJ');
  resultanteComponenteJ.value = calcTotal(compJ);
}

function calcTotal(comp) {
  let total = 0;
  for (let componente of comp) {
    total += componente;
  }
  return total;
}

function acrescentarVetUn() {
  //--Cria elementos DOM
  let section = cria('section'),
      titulo = cria('h3'),
      label = cria('label'),
      inputs = cria('input');
  const numeroDoProximoVetor = (document.getElementsByClassName('vetUn').length + 1);

  section.classList.add('vetUn');
  titulo.innerHTML = `Vetor ${numeroDoProximoVetor}`;
  section.appendChild(titulo);

  label.innerHTML = 'Valor de î:';
  inputs.value = 0;
  inputs.type = 'number';
  inputs.classList.add('compI');
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.innerHTML = 'Valor de j:';
  inputs = cria('input');
  inputs.value = 0;
  inputs.type = 'number';
  inputs.classList.add('compJ');
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.innerHTML = 'Valor de u:';
  inputs = cria('input');
  inputs.disabled = 'true';
  label.appendChild(inputs);
  section.appendChild(label);

  const vetUnEls = document.getElementsByClassName('vetUn');
  insertAfter(section, vetUnEls[vetUnEls.length-1]);

  const nmrVetoresUnitarios = document.getElementsByClassName('vetUn').length;
  document.getElementById('addUn').disabled = nmrVetoresUnitarios === 5;
  document.getElementById('remUn').disabled = nmrVetoresUnitarios <= 2; 


}

function removerVetUn() {

  let vetUnEl = document.getElementById('vetores-unitarios');
  vetUnEl.removeChild(vetUnEl.querySelector('.vetUn:last-child'));

  let nmrVet = document.getElementsByClassName('vetUn').length;
  document.getElementById('remUn').disabled = nmrVet === 2;
  document.getElementById('addUn').disabled = nmrVet < 2;

}

function cria(el) {
  return document.createElement(el);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}