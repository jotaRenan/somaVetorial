"use strict";
var vetores = document.getElementsByClassName('vetor'),
    arrVetores =  Array.prototype.slice.call(vetores);

window.onload = function() {
  //--HABILITA EVENTOS DOS INPUTS
  for (var i = 0; i < vetores.length-1; i++) {
    linkar(vetores[i]);
  }
  //---EVENTO DE RESULTADO
  document.getElementsByClassName('resultado')[0].addEventListener('click', function() {
    resultante();
  }, false);

  document.getElementsByClassName('resultado')[1].addEventListener('click', calcResultanteUn, false);

  document.getElementsByClassName('addUn')[0].addEventListener('click', acrescentarVetUn, false);

};

//--rotaciona setas de acordo com angulo
function rotacionar(val, vetor) {
  var seta = vetor.getElementsByClassName('seta')[0];
  seta.style.transform = "rotate(" + (-val) + "deg)";
}

function resultante() {
  var ckb = document.getElementsByName('op');
  var arrModulos = [],
      arrAngulos = [];
  for (var i=0; i < vetores.length-1; i++) { //array tem 1 elemento a mais
    arrModulos.push(vetores[i].getElementsByClassName('modulo')[0].value);
    arrAngulos.push(vetores[i].getElementsByClassName('valorFinal')[0].value);
  }
  //--IMPLEMENTAR AQUI FUNCIONALIDADE DE +DE 3 VETORES
  var angulo,
      modResult,
      angResult,
      a = arrModulos[0],
      b = arrModulos[1];
  //--SE FOR UMA SUBTRAÇÃO, O ÂNGULO X A SER SUBTRAÍDO SE TRANSFORMA EM -X
  if (ckb[1].checked) {
    arrAngulos[1] = parseFloat(arrAngulos[1]) + parseFloat(180);
  }
  //--ANGULO ENTRE 2 VETORES
  angulo = Math.max(arrAngulos[0], arrAngulos[1]) - Math.min(arrAngulos[0], arrAngulos[1]);
  //--LEI DOS COSSENOS
  modResult = Math.sqrt( a*a + b*b - 2*a*b*Math.cos(Math.PI - angulo*Math.PI/180) );
  //--ANGULO RESULTANTE
  //angulo mesma direção e sentido
  if (arrAngulos[0] == arrAngulos[1]) {
    angResult = arrAngulos[0];
  }
  //angulo mesma direção e sentidos diferentes
  else if (Math.max(arrAngulos[0], arrAngulos[1]) - Math.min(arrAngulos[0], arrAngulos[1]) == 180) {
    if (arrModulos[0] > arrModulos[1]) {
      angResult = arrAngulos[0];
    }
    else {
      angResult = arrAngulos[1];
    }
  }
  //angulo direção e sentidos distintos
  else {
    //calculando o angulo entre o vetor resultante e o maior vetor
    var senoX = Math.min(arrModulos[0], arrModulos[1]) * Math.sin((180-angulo)*Math.PI/180)/modResult;
    var rad = Math.asin(senoX);
    var x = (rad*180)/Math.PI;
    if (x < 0) {
      x*= -1;
    }
    //pequena gambiarra
    if (arrAngulos[0] === 0 || arrAngulos[0] == 360) {
      if (arrAngulos[1] > 180) {
        arrAngulos[0] = 360;
      }
      else {
        arrAngulos[0] = 0;
      }
    }
    if (arrAngulos[1] === 0 || arrAngulos[1] == 360) {
      if (arrAngulos[0] > 180) {
        arrAngulos[1] = 360;
      }
      else {
        arrAngulos[1] = 0;
      }
    }
    //formando o ângulo resultante
    if (parseFloat(arrModulos[0]) > parseFloat(arrModulos[1])) {
      if (parseFloat(arrAngulos[0]) > parseFloat(arrAngulos[1])) { //não ta entrando nessa condição
        angResult = parseFloat(arrAngulos[0]) - parseFloat(x);
      }
      else {
        angResult = parseFloat(arrAngulos[0]) + parseFloat(x);
      }
    }
    else if (parseFloat(arrModulos[1]) > parseFloat(arrModulos[0])) {
      if (parseFloat(arrAngulos[1]) > parseFloat(arrAngulos[0])) {
        angResult = parseFloat(arrAngulos[1]) - parseFloat(x);
      }
      else {
        angResult = parseFloat(arrAngulos[1]) + parseFloat(x);
      }
    }
    else if(parseFloat(arrModulos[0]) == parseFloat(arrModulos[1])) {
      angResult = parseFloat(Math.min(arrAngulos[0], arrAngulos[1])) + parseFloat(x);
    }
  }
  if (angResult > 360) {
    angResult %= 360;
  }
  //--CHAMA A FUNÇÃO MONTAR VETOR
  montarVetor(modResult, round(angResult, 3));
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function montarVetor(mod, angulo) {
  //--verifica se vetor resultante ja está sendo exibido
  var vetRes;
  if (document.getElementsByClassName('vetor-resultante')[0]) {
    vetRes = document.getElementsByClassName('vetor-resultante')[0];
  }
  else {
    vetRes = document.getElementsByClassName('vetor-final')[0];
  }
  //--caso o modulo da resultante seja nula, caso especial
  if (mod === 0) {
    var  seta = vetRes.getElementsByClassName('seta')[0];
    seta.style.transform = 'rotate(0)';
    seta.src = "zero.png";
    vetRes.getElementsByClassName('valorFinal')[0].value = 0;
  }
  else {
    vetRes.getElementsByClassName('seta')[0].src = "seta1.png";
    vetRes.getElementsByClassName('seta')[0].style.transform = "rotate(" + (-angulo) + 'deg)';    
    vetRes.getElementsByClassName('valorFinal')[0].value = angulo;
  }
  //---Mostra modulo com 3 casas dps da virgula
  vetRes.getElementsByClassName('modulo')[0].value = round(mod, 3);

  //--Exibe resultante, caso n esteja sendo exibida
  if (vetRes.classList.contains('vetor-resultante')) {
    vetRes.classList.remove('vetor-resultante');
    vetRes.classList.add('vetor-final');
  }
  
}

//--Funcao nao-implementada que permitira +de 2 vetores
function criarVetor() {
  var sec = document.createElement('section');

}

//--Faz conexao entre valores dos inputs e rotaçao
function linkar(vetor) {
  //---CASO ALTERE VALOR PELO RANGE
  vetor.getElementsByClassName('valorRange')[0].addEventListener('input', function(e) {
    e.target.parentNode.getElementsByClassName('valorNumber')[0].value = e.target.value;
    e.target.parentNode.getElementsByClassName('valorFinal')[0].value = e.target.value;

    rotacionar(e.target.value, e.target.parentNode);
  }, false);
//
  //---CASO ALTERE VALOR PELO INPUT
  vetor.getElementsByClassName('valorNumber')[0].addEventListener('input', function(e) {
    var valor = e.target.value;
    
    if(valor>=360) {
      valor = valor%360;
    }

    valor = (valor < 0) ? eval(360+valor) : valor;
    e.target.parentNode.parentNode.getElementsByClassName('valorRange')[0].value = valor;
    e.target.parentNode.parentNode.getElementsByClassName('valorFinal')[0].value = valor;
    rotacionar(valor, e.target.parentNode.parentNode);
  }, false);
}


