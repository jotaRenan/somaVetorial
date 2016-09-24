class vetorPadrao {

  constructor (vetor) {
    if (arguments.length === 1) {
      this._modulo = vetor.querySelector('.modulo').value;
      this._anguloAbs = vetor.querySelector('.valorNumber').value;
      this._anguloCorresp = vetor.querySelector('.valorFinal').value;
      //Dar jeito de lidar com names dos radio buttons.
      //this._isSubtracao = 
    }
    else {
      this._modulo = 1;
      this._anguloCorresp = 0;
      this._anguloAbs = 0;
      this._isSubtracao = false;
    }
  }

  calculaResultante() {
    //-- Hey, Paula: do the math!
  }

  set modulo(mod) {
    this._modulo = mod;
  }

  get modulo() {
    return this._modulo;
  }

  get angulo() {
    return this._anguloCorresp;
  }

  set angulo(angulo) {
    this._anguloAbs = angulo;
    this._anguloCorresp = angulo%360;
  }

  get anguloAbsoluto() {
    return this._anguloAbs;
  }

  set isSubtracao(arg) {
    this._isSubtracao = arg;
  }

  get isSubtracao() {
    return this._isSubtracao;
  }

}