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

  convertePadraoUnit(values) {
    //values é um vetor que vai conter em 0 o módulo e em 1 o ângulo do vetor
    let modulo,
        radiano,
        sinAng,
        angulo,
        compI,
        compJ,
        compK;
    modulo = values[0];
    angulo = values[1];
    //transforma angulo em rad
    radiano = (Math.PI * angulo)/180;
    //calcula os componentes
    compK = 0; //componente K não será necessário
    compJ = Math.sin(radiano) * modulo;
    sinAng = Math.sin(radiano);
    compI = Math.cos(radiano) * modulo;
    //a função retornará um vetor na ordem I, J, K
    return [compI, compJ, compK];
  }

  converteUnitPadrao(values) {
    //values é um vetor que vai conter em 0 o compI, em 1 o compJ e em 2 o compK
    let modulo,
        angulo,
        radiano,
        compI,
        compJ,
        compK,
        senAng;
    compI = values[0];
    compJ = values[1];
    compK = values[2];
    //calcula o modulo a partir do componente
    modulo = parseFloat(Math.sqrt( Math.pow(compI, 2) + Math.pow(compJ, 2) + Math.pow(compK, 2) ));
    //calcula o angulo
    senAng = (compI/modulo);
    radiano = Math.asin(senAng);
    angulo = (radiano*180)/Math.PI;
    //a função retornará um vetor na ordem módulo, ângulo
    return [modulo, angulo];
  }

  calculaResultante() {
    let compI,
        compJ,
        compK;


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