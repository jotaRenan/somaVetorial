'use strict';
var vetoresEl = document.querySelectorAll('.vetor');
var significativos;

window.onload = function() {
  //--HABILITA EVENTOS DOS INPUTS
  for (let vetALinkar of vetoresEl) {
    linkar(vetALinkar);
  }
  //---EVENTO DE RESULTADO
  document.getElementsByClassName('resultado')[0].addEventListener('click', calcResultanteVetPadrao, false);

  document.getElementsByClassName('resultado')[1].addEventListener('click', calcResultanteVetUnitario, false);

  document.getElementById('addUn').addEventListener('click', acrescentarVetUn, false);

  document.getElementById('remUn').addEventListener('click', removerVetUn, false);
};

//--rotaciona setas de acordo com angulo
function rotacionarSetaDoVetor(val, vetor) {
  let seta = vetor.querySelector('.seta');
  seta.style.transform = 'rotate(' + (-val) + 'deg)';
}

function calcResultanteVetPadrao() {
  let ckb = document.getElementsByName('op'),
      arrModulos = [],
      arrAngulos = [];
  for (let vetor of vetoresEl) { //array tem 1 elemento a mais
    arrModulos.push(vetor.querySelector('.modulo').value);
    arrAngulos.push(vetor.querySelector('.valorFinal').value);
  }
  //--IMPLEMENTAR AQUI FUNCIONALIDADE DE +DE 3 VETORES
  let angulo,
      modResult,
      angResult,
      a = arrModulos[0],
      b = arrModulos[1];
  
  //DEFINIÇÃO DO NÚMERO DE ALGARISMOS SIGNIFICATIVOS
  let decimaisVet1 = a.split(".")[1].length;
  let decimaisVet2 = b.split(".")[1].length;
  significativos = Math.min(decimaisVet1, decimaisVet2);

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
    if (parseFloat(arrAngulos[0]) === 0 || parseFloat(arrAngulos[0]) === 360) {
      if (parseFloat(arrAngulos[1]) > 180) {
        arrAngulos[0] = 360;
      }
      else {
        arrAngulos[0] = 0;
      }
    }
    if (parseFloat(arrAngulos[1]) === 0 || parseFloat(arrAngulos[1]) === 360) {
      if (parseFloat(arrAngulos[0]) > 180) {
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
    else if (parseFloat(arrModulos[0]) === parseFloat(arrModulos[1])) {
      if (parseFloat(arrAngulos[0]) > 270 && parseFloat(arrAngulos[1]) < 90) {
        angResult = parseFloat(arrAngulos[0]) + parseFloat(x);
      } 
      else if (parseFloat(arrAngulos[1]) > 270 && parseFloat(arrAngulos[0]) < 90) {
        angResult = parseFloat(arrAngulos[1]) + parseFloat(x);
      }     
      else {
        angResult = parseFloat(Math.min(arrAngulos[0], arrAngulos[1])) + parseFloat(x);
      }
    }
  }
  if (angResult > 360) {
    angResult %= 360; 
  }

  montarVetor(modResult, round(angResult, significativos));
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function montarVetor(mod, angulo) {
  //--verifica se vetor resultante ja está sendo exibido
  let vetRes;
  if (document.querySelector('.vetor-resultante')) {
    vetRes = document.querySelector('.vetor-resultante');
  }
  else {
    vetRes = document.querySelector('.vetor-final');
  }
  //--caso o modulo da resultante seja nula, caso especial
  let  seta = vetRes.querySelector('.seta');
  if (mod === 0) {
    seta.style.transform = 'rotate(0)';
    seta.src = 'imgs\\zero.png';
    vetRes.querySelector('.valorFinal').value = 0;
  }
  else {
    seta.src = 'imgs\\seta1.png';
    seta.style.transform = 'rotate(' + (-angulo) + 'deg)';
    vetRes.querySelector('.valorFinal').value = angulo;
  }
  //---Mostra modulo com o número correto de alg significativos
  vetRes.querySelector('.modulo').value = round(mod, significativos);

  //--Exibe resultante, caso n esteja sendo exibida
  if (vetRes.classList.contains('vetor-resultante')) {
    vetRes.classList.remove('vetor-resultante');
    vetRes.classList.add('vetor-final');
  }
  
}

//--Funcao nao-implementada que permitira +de 2 vetores
function criarVetor() {
  let sec = document.createElement('section');
}

//--Faz conexao entre valores dos inputs e rotaçao
function linkar(vetor) {
  //---CASO ALTERE VALOR PELO RANGE
  vetor.querySelector('.valorRange').addEventListener('input', function(e) {
    let alvoEl = e.target,
        vetorEl = alvoEl.closest('.vetor'),
        valorAlvoEl = alvoEl.value;

    vetorEl.querySelector('.valorNumber').value = valorAlvoEl;
    vetorEl.querySelector('.valorFinal').value = valorAlvoEl;

    rotacionarSetaDoVetor(valorAlvoEl, vetorEl);
  }, false);
  //---CASO ALTERE VALOR PELO INPUT
  vetor.querySelector('.valorNumber').addEventListener('input', function(e) {
    let alvoEl = e.target,
        vetorEl = alvoEl.closest('.vetor'),
        valorAlvoEl = alvoEl.value;
    
    if (valorAlvoEl >= 360) {
      valorAlvoEl = valorAlvoEl%360;
    }

    valorAlvoEl = (valorAlvoEl < 0) ? (360+valorAlvoEl) : valorAlvoEl;
    vetorEl.querySelector('.valorRange').value = valorAlvoEl;
    vetorEl.querySelector('.valorFinal').value = valorAlvoEl;
    rotacionarSetaDoVetor(valorAlvoEl, vetorEl);
  }, false);
}


