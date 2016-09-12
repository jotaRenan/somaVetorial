class VetorUnitario {
	
	constructor(vetorUnEl) {
		if (arguments.length === 1) {
			this.compI = parseFloat(vetorUnEl.querySelector('.compI').value);
			this.compJ = parseFloat(vetorUnEl.querySelector('.compJ').value);
			this.compK = parseFloat(vetorUnEl.querySelector('.compK').value);
			this._isSubtracao = vetorUnEl.querySelector('.cbx-subtracao-un').checked;
			this._modulo = this.calculaResultante();
		}
		else {
			this.compI = 0;
			this.compJ = 0;
			this.compK = 0;
			this._modulo = 0;
		}
	}
	set i(i) {
		this.compI = i;
	}
	get i() {
		return this.compI;
	}
	set j(j) {
		this.compJ = j;
	}
	get j() {
		return this.compJ;
	}
	set k(k) {
		this.compK = k;
	}
	get k() {
		return this.compK;
	}
	set isSubtracao(arg) {
		this._isSubtracao = arg;
	}
	get isSubtracao() {
		return this._isSubtracao;
	}

	calculaResultante() {
		this._modulo = Math.sqrt( Math.pow(this.compI, 2) + Math.pow(this.compJ, 2) + Math.pow(this.compK, 2) );
	}

	get modulo() {
		if (this._modulo == undefined) {
			this.calculaResultante();
		}
		return this._modulo;
	}

	inverterValores() {
		this.compI *= -1;
		this.compJ *= -1;
		this.compK *= -1;
	}

	static soma(...vetores) {
		let vetUnitarioResultante = new VetorUnitario();
		for (let vet of vetores) {
			if (vet.isSubtracao) {
				vet.inverterValores();
			}
			vetUnitarioResultante.i += vet.i;
			vetUnitarioResultante.j += vet.j;
			vetUnitarioResultante.k += vet.k;
		}
		vetUnitarioResultante.calculaResultante();
		return vetUnitarioResultante;
	}

}