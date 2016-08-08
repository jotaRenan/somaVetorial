"use strict";

function calcResultanteUn() {
  var vetUn = document.getElementsByClassName('vetUn'),
      arrVetUn =  Array.prototype.slice.call(vetUn),
      vetUnRes = document.getElementsByClassName('vetUn-resultante')[0],
      //--Valores dos componentes inseridos por usuario
      compI = [],
      compJ = [],
      //--Componentes resultantes
      resI,
      resJ;

  for (var j = 0; j < vetUn.length; j++) {
    //---Vai colocando, nos arrays, os valores inseridos. 
    compI.push(parseFloat(vetUn[j].getElementsByClassName('compI')[0].value));
    compJ.push(parseFloat(vetUn[j].getElementsByClassName('compJ')[0].value));
  }
  //---Soma os valores e exibe resultado.
  resI = vetUnRes.getElementsByClassName('resI')[0];
  resI.value = calcTotal(compI);
  resJ = vetUnRes.getElementsByClassName('resJ')[0];
  resJ.value = calcTotal(compJ);
}

function calcTotal(comp) {
  var total = 0;
  for (var j = 0; j < comp.length; j++) {
    total+= comp[j];
  }
  return total;
}

function acrescentarVetUn() {
  //--Cria elementos DOM
  var section = cria('section'),
      titulo = cria('h3'),
      label = cria('label'),
      inputs = cria('input');
  section.className = "vetUn";
  section.classList.add('vetUn');
  titulo.innerHTML = "Vetor " + (document.getElementsByClassName('vetUn').length + 1);
  section.appendChild(titulo);

  label.innerHTML = "Valor de î:";
  inputs.value = 0;
  inputs.type = "number";
  inputs.className = "compI";
  inputs.classList.add("compI");
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.innerHTML = "Valor de j:";
  inputs = cria('input');
  inputs.value = 0;
  inputs.type = "number";
  inputs.className = "compJ";
  inputs.classList.add("compJ");
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.innerHTML = "Valor de u:";
  inputs = cria('input');
  inputs.className = "compU";
  inputs.disabled = "true";
  label.appendChild(inputs);
  section.appendChild(label);
  //- Linha seguinte: Gambiarra em relaçao a layout. Melhorar.
  document.getElementsByClassName('box')[2].appendChild(section);
  if (document.getElementsByClassName('vetUn').length === 5) {
    document.getElementsByClassName('addUn')[0].disabled="true";
  }
}

function cria(el) {
  return document.createElement(el);
}