function rotacionar(val, vetores, index) {
  var seta = vetores[index].getElementsByClassName('seta')[0];
  seta.style.transform = "rotate(" + (-val) + "deg)";
}

function resultante() {
  var vetores = document.getElementsByClassName('vetor'),
      arrVetores =  Array.prototype.slice.call(vetores),
      arrModulos = [],
      arrAngulos = [];
  for (var i=0; i< vetores.length-1; i++) {
    arrModulos.push(vetores[i].getElementsByClassName('modulo')[0].value);
    arrAngulos.push(vetores[i].getElementsByClassName('valorFinal')[0].value);
  }
  
  var angulo,
      modResult,
      a = arrModulos[0];
      b = arrModulos[1];
  angulo= Math.max(arrAngulos[0], arrAngulos[1]) - Math.min(arrAngulos[0], arrAngulos[1]);
  angulo*=(Math.PI/180);
  modResult = Math.sqrt( Math.pow(a,2) + Math.pow(b, 2) - 2*a*b*Math.cos(Math.PI-angulo) );
  console.log(a + ' ' + ' ' + b + ' ' + angulo);
  console.log(modResult);

}

window.onload = function() {
  //--HABILITA EVENTOS DOS INPUTS
  var vetores = document.getElementsByClassName('vetor'),
      arrVetores =  Array.prototype.slice.call(vetores);
  for (var i=0; i<vetores.length-1; i++) {
    //---CASO ALTERE VALOR PELO RANGE
    vetores[i].getElementsByClassName('valorRange')[0].addEventListener('input', function(e) {
      e.target.parentNode.getElementsByClassName('valorNumber')[0].value = e.target.value;
      e.target.parentNode.getElementsByClassName('valorFinal')[0].value = e.target.value;

      rotacionar(e.target.value, vetores, arrVetores.indexOf(e.target.parentNode));
    }, false);

    //---CASO ALTERE VALOR PELO INPUT
    vetores[i].getElementsByClassName('valorNumber')[0].addEventListener('input', function(e) {
      var valor = e.target.value;
      while (valor > 360) {     //alguem melhora essa parada aqui pq ta um lixo
        valor -= 360;
      }
      valor = (valor < 0) ? eval(360+valor) : valor;
      e.target.parentNode.getElementsByClassName('valorRange')[0].value = valor;
      e.target.parentNode.getElementsByClassName('valorFinal')[0].value = valor;
      rotacionar(valor, vetores, arrVetores.indexOf(e.target.parentNode));
    }, false);
  }

  //---EVENTO DE RESULTADO
  document.getElementById('resultado').addEventListener('click', function() {
    resultante();
  }, false);
};