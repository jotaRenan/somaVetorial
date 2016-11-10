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
  if (mod == 0) {
    seta.style.transform = 'rotate(0)';
    seta.src = 'imgs\\zero.png';
    vetRes.querySelector('.valorFinal').value = 0;
  }
  else {
    seta.src = 'imgs\\seta1.png';
    seta.style.transform = 'rotate(' + (-angulo) + 'deg)';
    angulo = parseFloat(angulo, 10);
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
      desejaSignificativos = document.querySelector('#significativos').checked,
      significativos = [],
      valoresVetores = [];
  
  
  //Gera objetos baseados na classe VetorPadrao baseado nos elementos do HTML
  for (let vetorElAtual of vetoresEl) {
    valoresVetores.push( new VetorPadrao(vetorElAtual) );
  }
  //Calcula e atribui resultante da soma
  let vetorResultante = VetorPadrao.soma(valoresVetores);

  //ALGARISMOS SIGNIFICATIVOS DESABILITADOS. SAO O TERCEIRO ARG DA FUNCAO ABAIXO
  montarVetor(vetorResultante.modulo, round(vetorResultante.angulo, 1), vetorResultante.significativos);
}