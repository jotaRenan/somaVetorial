'use strict';

window.onload = function() {
  //--HABILITA EVENTOS DOS INPUTS
  let vetoresEl = document.querySelectorAll('.vetor');

  for (let vetALinkar of vetoresEl) {
    linkar(vetALinkar);
  }

  //localStorage, permitindo saber qts vezes o usuario visitou o site #j
  try {
    if (!localStorage.getItem('visitas')) {
      localStorage.setItem('visitas', 0);
    }
    else {
      if (!sessionStorage.getItem('visitaAtual')) { 
        let visitas = parseFloat(localStorage.getItem('visitas'));
        if (visitas < 3) {
          //--Desenvolver codigo de div p/ explicaçao #j
          document.querySelector('#tutorial').style.display = 'block';
        }
        localStorage.setItem('visitas', ++visitas);
        sessionStorage.setItem('visitaAtual', true);
      }
    }
  }
  catch (ex) {
    console.log('Browser não suporta localStorage' + ex.message);
  }

  //---EVENTO DE RESULTADO
  document.getElementsByClassName('resultado')[0].addEventListener('click', calculaTodosVetores, false);

  document.getElementsByClassName('resultado')[1].addEventListener('click', calcResultanteVetUnitario, false);

  document.getElementById('addUn').addEventListener('click', acrescentarVetUn, false);

  document.getElementById('remUn').addEventListener('click', removerVetUn, false);

  document.getElementById('addVet').addEventListener('click', acrescentarVetPadrao, false);

  document.getElementById('remVet').addEventListener('click', removerVetPadrao, false);
};

//--rotaciona setas de acordo com angulo
function rotacionarSetaDoVetor(val, vetor) {
  let seta = vetor.querySelector('.seta');
  seta.style.transform = 'rotate(' + (-val) + 'deg)';
}

function calcResultanteVetPadrao(arrModulos, arrAngulos) {
  let angulo,
      modResult,
      angResult,
      a = arrModulos[0],
      b = arrModulos[1];
  //DEFINIÇÃO DO NÚMERO DE ALGARISMOS SIGNIFICATIVOS
  let desejaSignificativoEl = document.querySelector('#significativos'),
      significativos;
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
  return [modResult, angResult, significativos];
}

function round(value, decimals) {
  value = Number(value);
  return value.toFixed(decimals);
}

function montarVetor(mod, angulo, significativos) {
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

function acrescentarVetPadrao() {
  let section, titulo, numeroProxVetor, imagemSeta, label, input, radioButtons;
  numeroProxVetor = document.querySelectorAll('.vetor').length+1;
  section = cria('section');
  section.classList.add('vetor');
  titulo = cria('h3');
  titulo.textContent = `Vetor ${numeroProxVetor}:`;
  section.appendChild(titulo);
  imagemSeta = cria('img');
  imagemSeta.src = 'imgs\\seta1.png';
  imagemSeta.classList.add('seta');
  imagemSeta.draggable = false;
  section.appendChild(imagemSeta);

  label = cria('label');
  label.textContent = 'Módulo';
  input = cria('input');
  input.type = 'number';
  input.min = 0;
  input.value = 1;
  input.placeholder = 1;
  input.classList.add('modulo');
  label.appendChild(input);
  section.appendChild(label);

  label = cria('label');
  label.textContent = 'Ângulo absoluto:';

  input = cria('input');
  input.type = 'number';
  input.classList.add('valorNumber');
  input.min = 0;
  input.max = 360;
  input.value = 0;
  input.placeholder = 0;
  label.appendChild(input);
  section.appendChild(label);

  input = cria('input');
  input.type = 'range';
  input.value = 0;
  input.classList.add('valorRange');
  input.min = 0;
  input.max = 360;
  input.step = 15;
  section.appendChild(input);

  label = cria('label');
  label.textContent = 'Ângulo correspondente:';

  input = cria('input');
  input.type = 'number';
  input.disabled = true;
  input.classList.add('valorFinal');
  input.value = 0;
  input.placeholder = 0;
  label.appendChild(input);
  section.appendChild(label);

  label = cria('label');
  label.textContent = 'Soma';
  input = cria('input');
  input.type = 'radio';
  input.checked = true;
  input.name = `op${numeroProxVetor-1}`;
  label.appendChild(input);
  section.appendChild(label);

  label = cria('label');
  label.textContent = 'Subtracao';
  input = cria('input');
  input.type = 'radio';
  input.name = `op${numeroProxVetor-1}`;
  label.appendChild(input);
  section.appendChild(label);

  linkar(section);
  const vetoresPadraoEls = document.querySelectorAll('.vetor');
  insertAfter(section, vetoresPadraoEls[vetoresPadraoEls.length-1]);
  controlaAdicaoRemocaoVetPadrao();
}

function removerVetPadrao() {
  let containerVetoresPadraoEl = document.getElementById('vetores-padrao');
  //--Por razoes sinistras, usar o selector que deveria funcionar, nao funciona.
  let tamanho = containerVetoresPadraoEl.querySelectorAll('.vetor').length;
  containerVetoresPadraoEl.removeChild(containerVetoresPadraoEl.querySelector(`.vetor:nth-child(${tamanho})`));
  //--Implementar controle de botoes
  controlaAdicaoRemocaoVetPadrao();
}

function controlaAdicaoRemocaoVetPadrao() {
  const nmrVet = document.getElementsByClassName('vetor').length;
  document.getElementById('addVet').disabled = nmrVet === 5;
  document.getElementById('remVet').disabled = nmrVet === 2;
}

function calculaTodosVetores() {
  let vetoresEl = document.querySelectorAll('.vetor'),
      arrModulos = [],
      arrAngulos = [],
      arrOpcao = [],
      modResult,
      angResult,
      desejaSignificativos = document.querySelector('#significativos').checked,
      significativos = [];
  for (let i=0; i < vetoresEl.length; i++) { //array tem 1 elemento a mais
    let valorModulo = vetoresEl[i].querySelector('.modulo').value;
    arrModulos.push(valorModulo);
    //--Esta gambiarra checa se eh uma subtraçao ou nao
    if (document.getElementsByName(`op${i}`)[1].checked) {
      arrAngulos.push(vetoresEl[i].querySelector('.valorFinal').value+180);
    }
    else {
      arrAngulos.push(vetoresEl[i].querySelector('.valorFinal').value);
    }
    //--Esta outra gambiarra checa os alg. significativos
    if (desejaSignificativos) {
      let parteDecimal = valorModulo.split(".")[1]
      significativos.push( parteDecimal ? parteDecimal.length : 0 );
    }
  }
  for (let i = 0; i < (vetoresEl.length)-1; i++) { //a quantidade de cálculos feitos é a quantidade de vetores menos um
    //vetores auxiliares para facilitar a passagem dos vetores para realizar o cálculo
    let arrA,
        arrM;
    if (i == 0) {
      arrA = [arrAngulos[0], arrAngulos[1]];
      arrM = [arrModulos[0], arrModulos[1]];
    }
    else {
      arrA = [angResult, arrAngulos[(i+1)]];
      arrM = [modResult, arrModulos[(i+1)]];
    }
    let values = calcResultanteVetPadrao(arrM, arrA);
    modResult = values[0];
    angResult = values[1];
    //significativos.push(values[2]);
  }
  significativos = desejaSignificativos ? Math.min(...significativos) : 3;
  montarVetor(modResult, round(angResult, 1), significativos);
}