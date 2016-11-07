class vetorPadrao {

  constructor (vetor) {
    if (arguments.length === 1) {
      this._modulo = vetor.querySelector('.modulo').value;
      this._anguloAbs = vetor.querySelector('.valorNumber').value;
      this._anguloCorresp = vetor.querySelector('.valorFinal').value;
      //RESOLVER COMO LIDAR COM A SUBTRAÇAO
      //this._isSubtracao = document.getElementsByName(`op${i}`)[1].checked;
    }
    else {
      this._modulo = 1;
      this._anguloCorresp = 0;
      this._anguloAbs = 0;
      this._isSubtracao = false;
    }
  }

  convertePadraoUnit(vetor) {
    //vetor é um array que vai conter em 0 o módulo e em 1 o ângulo do vetor
    let modulo,
        radiano,
        sinAng,
        angulo,
        compI,
        compJ,
        compK;
    modulo = vetor[0];
    angulo = vetor[1];
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

  converteUnitPadrao(vetor) {
    //vetor é um array que vai conter em 0 o compI, em 1 o compJ e em 2 o compK
    let modulo,
        angulo,
        radiano,
        compI,
        compJ,
        compK,
        senAng;
    compI = vetor[0];
    compJ = vetor[1];
    compK = vetor[2];
    //calcula o modulo a partir do componente
    modulo = parseFloat(Math.sqrt( Math.pow(compI, 2) + Math.pow(compJ, 2) + Math.pow(compK, 2) ));
    //calcula o angulo
    senAng = (compI/modulo);
    radiano = Math.asin(senAng);
    angulo = (radiano*180)/Math.PI;
    //a função retornará um vetor na ordem módulo, ângulo
    return [modulo, angulo];
  }

  /*calculaResultante(vetor1, vetor2) {
    let comp1I,
        comp1J,
        comp1K,
        comp2I,
        comp2J,
        comp2K,
        compIFinal
        compJFinal
        compKFinal;
    comp1I = vetor1[0];
    comp1J = vetor1[1];
    comp1K = vetor1[2];
    comp2I = vetor2[0];
    comp2J = vetor2[1];
    comp2K = vetor2[2];
    compIFinal = comp1I + comp2I;
    compJFinal = comp1J + comp2J;
    compKFinal = comp1K + comp2K;
    return [compIFinal, compJFinal, compKFinal];
  }*/

  inverterValores(vetor) {
    let compI,
        compJ,
        compK;
    compI = vetor[0];
    compJ = vetor[1];
    compK = vetor[2];
		compI *= -1;
		compJ *= -1;
		compK *= -1;
		return [compI, compJ, compK];
  }

  static soma(...vetores) {
		let vetResultante = new vetorPadrao(),
			compI,
			compJ,
			compK,
			compIFinal = 0,
	    compJFinal = 0,
	    compKFinal = 0;
		for (let vet of vetores) {
			let values = convertePadraoUnit(vet);
			compI = values[0];
			compJ = values[1];
			compK = values[2];
			if (vet.isSubtracao) {
				let values = inverterValores(vet);
				compI = values[0];
				compJ = values[1];
				compK = values[2];
			}
			compIFinal += compI;
			compJFinal += compJ;
			compKFinal += compK;
		}
		let values = converteUnitPadrao([compIFinal, compJFinal, compKFinal]);
		vetResultante.modulo = values[0];
		vetResultante.angulo = values[1];
		return vetResultante;
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