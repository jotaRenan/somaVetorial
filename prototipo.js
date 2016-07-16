var vetores = document.getElementsByClassName('vetor'),
      arrVetores =  Array.prototype.slice.call(vetores);

window.onload = function() {
  //--HABILITA EVENTOS DOS INPUTS
  for (var i=0; i<vetores.length-1; i++) {
    linkar(vetores[i]);
  }
  //---EVENTO DE RESULTADO
  document.getElementById('resultado').addEventListener('click', function() {
    resultante();
  }, false);
};

//--rotaciona setas de acordo com angulo
function rotacionar(val, vetor) {
  var seta = vetor.getElementsByClassName('seta')[0];
  seta.style.transform = "rotate(" + (-val) + "deg)";
}

function resultante() {
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
      a = arrModulos[0];
      b = arrModulos[1];
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
    if (arrModulos[0] > arrModulos[1])
      angResult = arrAngulos[0];
    else (arrModulos[1] > arrModulos[0])
      angResult = arrAngulos[1];
  }
  //angulo direção e sentidos distintos
  else {
    //FALTA EXPLICAÇÃO DO RONALDO PARA DESCOBRIR ESSA PARTE
    angResult = (Math.max(arrAngulos[0], arrAngulos[1]) - angulo/2);
  }
  montarVetor(modResult, angResult);
}


function montarVetor(mod, angulo) {
  //--verifica se vetor resultante ja está sendo exibido
  if (document.getElementsByClassName('vetor-resultante')[0]) {
    var vetRes = document.getElementsByClassName('vetor-resultante')[0];
  }
  else {
    var vetRes = document.getElementsByClassName('vetor-final')[0];
  }
  //--caso o modulo da resultante seja nula, caso especial
  if (mod === 0) {
    vetRes.getElementsByClassName('seta')[0].src = "zero.png";
    vetRes.getElementsByClassName('valorFinal')[0].value = 0;
  }
  else {
    vetRes.getElementsByClassName('seta')[0].src = "seta1.png";
    //As duas linhas abaixo estao com calculos errados. Tentem corrigir. por favor
    //Para entender erro: coloquem 0 e 270 degraus para somar.
    vetRes.getElementsByClassName('seta')[0].style.transform = "rotate(" + (-angulo) + 'deg)';    
    vetRes.getElementsByClassName('valorFinal')[0].value = angulo;
  }
  vetRes.getElementsByClassName('modulo')[0].value = mod;

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
    while (valor >= 360) {     //alguem melhora essa parada aqui pq ta um lixo
      valor -= 360;
    }
    valor = (valor < 0) ? eval(360+valor) : valor;
    e.target.parentNode.getElementsByClassName('valorRange')[0].value = valor;
    e.target.parentNode.getElementsByClassName('valorFinal')[0].value = valor;
    rotacionar(valor, e.target.parentNode);
  }, false);
}

