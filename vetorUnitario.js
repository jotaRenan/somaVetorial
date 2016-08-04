function unitario() {
  var iV1 = document.getElementById("iV1").value;
  var uV1 = document.getElementById("uV1").value;
  var jV1 = document.getElementById("jV1").value;
  var iV2 = document.getElementById("iV2").value;
  var uV2 = document.getElementById("uV2").value;
  var jV2 = document.getElementById("jV2").value;

  var resultV1 = Math.pow((Math.pow(iV1,2)) + (Math.pow(jV1,2)),0.5); // resultante do primeio vetor
  document.getElementById("uV1").value = resultV1.toFixed(3);
  var resultV2 = Math.pow((Math.pow(iV2,2)) + (Math.pow(jV2,2)),0.5); // resultante do segundo vetor
  document.getElementById('uV2').value = resultV2.toFixed(3);

  //somando os elementos i e j
  var iVFinal = parseFloat(iV1) + parseFloat(iV2);
  document.getElementById("iVFinal").value = iVFinal;
  var jVFinal = parseFloat(jV1) + parseFloat(jV2);
  document.getElementById("jVFinal").value = jVFinal;
  var mod = Math.sqrt((Math.pow(iVFinal,2)) + (Math.pow(jVFinal,2))); // módulo dos dois vetores
  document.getElementById("uVFinal").value = mod.toFixed(3);
}

function resultanteUn() {
  var vetUn = document.getElementsByClassName('vetUn'),
      arrVetUn =  Array.prototype.slice.call(vetUn),
      vetUnRes = document.getElementsByClassName('vetUn-resultante')[0],
      //--Valores dos componentes inseridos por usuario
      compI = [],
      compJ = [],
      //--Componentes resultantes
      resI,
      resJ;

  for (var j = 0; j < vetUn.length-1; j++) {
    //---Vai colocando, nos arrays, os valores inseridos. 
    compI.push(parseFloat(arrVetUn[j].getElementsByClassName('compI')[0].value));
    compJ.push(parseFloat(arrVetUn[j].getElementsByClassName('compJ')[0].value));
  }
  //---Soma os valores e exibe resultado.
  resI = vetUnRes.getElementsByClassName('resI')[0];
  resI.value = calcTotal(compI);
  resJ = vetUnRes.getElementsByClassName('resJ')[0];
  resJ.value = calcTotal(compJ);
}

function calcTotal(comp) {
  var total = 0;
  for (var j = 0; j<comp.length; j++) {
    total+= comp[j];
  }
  return total;
}

function acrescentarUn() {
  //--Cria elementos DOM
  var section = cria('section'),
      titulo = cria('h3'),
      label = cria('label'),
      inputs = cria('input');
  section.className = "vetUn";
  section.classList.add('vetUn');
  titulo.innerHTML = "Vetor " + document.getElementsByClassName('vetUn').length;
  section.appendChild(titulo);

  label.innerHTML = "Valor de î:";
  inputs.type="number";
  inputs.className="compI";
  inputs.value = 0;
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.innerHTML = "Valor de j:";
  inputs = cria('input');
  inputs.className = "compJ";
  label.appendChild(inputs);
  section.appendChild(label);

  label = cria('label');
  label.innerHTML = "Valor de u:";
  inputs = cria('input');
  inputs.className = "compU";
  inputs.disabled = "true";
  label.appendChild(inputs);
  section.appendChild(label);
  //- Linha seguinte === Gambiarra. Melhorar.
  document.getElementsByClassName('box')[2].appendChild(section);
  if (document.getElementsByClassName('vetUn').length === 6) {
    document.getElementsByClassName('addUn')[0].disabled="true";
  }
}

function cria(el) {
  return document.createElement(el);
}