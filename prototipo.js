function mudaCanvas(val) {
  var seta = document.getElementById('seta');
  seta.style.transform = "rotate(" + (-val) + "deg)";
}

window.onload = function() {

  document.getElementById('valorRange').addEventListener('input', function(e) {
    document.getElementById('valorNumber').value = e.target.value;
    document.getElementById('valorFinal').value = e.target.value;
    mudaCanvas(e.target.value);
  }, false);

  document.getElementById('valorNumber').addEventListener('input', function(e) {
    var valor = e.target.value;
    while (valor > 360) {     //alguem melhora essa parada aqui pq ta um lixo
      valor -= 360;
    }
    document.getElementById('valorRange').value = valor;
    document.getElementById('valorFinal').value = valor;
    mudaCanvas(valor);
  }, false);

};