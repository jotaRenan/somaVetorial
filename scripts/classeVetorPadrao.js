
class VetorPadrao {

  constructor (vetor) {
    if (arguments.length === 1) {
      this._modulo = vetor.querySelector('.modulo').value;
      this._anguloAbs = vetor.querySelector('.valorNumber').value;
      this._anguloCorresp = vetor.querySelector('.valorFinal').value;
      let parteDecimal = this._modulo.split(".")[1]
      this._significativos = ( parteDecimal ? parteDecimal.length : 0 );
      // Descobre se está selecionada subtraçao.
      let i = vetor.querySelector('h3').textContent;
      i = parseInt(i.substr(6,1), 10)-1;
      this._isSubtracao = document.getElementsByName(`op${i}`)[1].checked;
    }
    else if (arguments.length === 3) {
      this._modulo = arguments[0];
      this._anguloAbs = arguments[1];
      this._anguloCorresp = this._anguloAbs%360;
      this._significativos = arguments[2];
    }
    else {
      this._modulo = 1;
      this._anguloCorresp = 0;
      this._anguloAbs = 0;
      this._isSubtracao = false;
      this._significativos = 3;
    }
  }

  static convertePadraoUnit(objVetorPadrao) {
    //objVetorPadrao é uma instancia de vetorPadrao
    let modulo,
        radiano,
        sinAng,
        angulo,
        compI,
        compJ,
        compK;
    modulo = objVetorPadrao.modulo;
    angulo = objVetorPadrao.angulo;
    //transforma angulo em rad
    radiano = (Math.PI * angulo)/180;
    //calcula os componentes
    compI = round(Math.cos(radiano), objVetorPadrao.significativos) * modulo;
    compJ = round(Math.sin(radiano), objVetorPadrao.significativos) * modulo;
    compK = 0; //componente K não será necessário
    sinAng = round(Math.sin(radiano), objVetorPadrao.significativos);

    //funcao retornará uma instancia de vetorUnitario
    return new VetorUnitario(compI, compJ, compK);
  }

  static converteUnitPadrao(objVetorUnit, significativos) {
    //recebe instancia de VetorUnitario
    let modulo,
        angulo,
        radiano,
        compI,
        compJ,
        compK,
        cosAng;
    compI = objVetorUnit.i;
    compJ = objVetorUnit.j;
    compK = objVetorUnit.k;
    //calcula o modulo a partir do componente. IMPORTANTE: arredonda!!
    modulo = round(parseFloat(Math.sqrt( Math.pow(compI, 2) + Math.pow(compJ, 2) + Math.pow(compK, 2) )), significativos);
    //calcula o angulo. Caso mod=0, ang=0 p/ evitar divisao por 0
    if (modulo == 0) {
      angulo = 0;
    }
    else {
      cosAng = (compI/modulo);
      radiano = Math.acos(cosAng);
      radiano = Math.atan2(compJ, compI);
      angulo = (radiano*180)/Math.PI;
      if(angulo < 0) {
        angulo += 360;
      }
    }
    //retorna instância de VetorPadrao
    return new VetorPadrao(modulo, angulo, significativos);
  }

  inverterValores() {
    if (this._anguloAbs > 179) {
		this._anguloAbs -= 180;
  	}
  	else {
  		this._anguloAbs += 180;
  	}
      this._anguloCorresp = this._anguloAbs%360;
  }

  //Recebe array de objetos de VetorPadrao
  static soma(vetores) {
		let versaoUnitario,
  			compIFinal = 0,
  	    compJFinal = 0,
  	    compKFinal = 0,
        significativos = [];
		for (let vet of vetores) {
			versaoUnitario = this.convertePadraoUnit(vet);
      significativos.push(vet.significativos);
			if (vet.isSubtracao) {
				versaoUnitario.inverterValores();
			}
			compIFinal += versaoUnitario.i;
			compJFinal += versaoUnitario.j;
			compKFinal += versaoUnitario.k;
		}
    //Descobre menor numero de sig. entre os vetores
    significativos = Math.min(...significativos);
		let vetResultante = this.converteUnitPadrao( new VetorUnitario(compIFinal, compJFinal, compKFinal), significativos );
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

  set significativos(sig){
    this._significativos = sig;
  }

  get significativos() {
    return this._significativos;
  }

}