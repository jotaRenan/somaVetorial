window.onload = function (){
	document.getElementsByClassName('resultado')[0].addEventListener('click', produtoVetorial, false);
}

produtoVetorial = function (){
	//declara variaveis dos vetores
	let vetoresEl = document.querySelectorAll('.vetUn');
	let vetor1 = vetoresEl[0];
	let vetor2 = vetoresEl[1];
	let compI1 = parseFloat(vetor1.querySelector('.compI').value);
	let compJ1 = parseFloat(vetor1.querySelector('.compJ').value);
	let compK1 = parseFloat(vetor1.querySelector('.compK').value);
	let compI2 = parseFloat(vetor2.querySelector('.compI').value);
	let compJ2 = parseFloat(vetor2.querySelector('.compJ').value);
	let compK2 = parseFloat(vetor2.querySelector('.compK').value);


	//atualiza modulos
	let mod1 = vetor1.querySelector('.moduloUn');
	let mod2 = vetor2.querySelector('.moduloUn');
	mod1.value = caculaModulo(compI1, compJ1, compK1);
	mod2.value = caculaModulo(compI2, compJ2, compK2);

	//cacula resultantes
	let compIRes = (compK2*compJ1) - (compJ2*compK1);
	let compJRes = (compK1*compI2) - (compK2*compI1);
	let compKRes = (compI1*compJ2) - (compJ1*compI2);
	let modRes = caculaModulo(compIRes, compJRes, compKRes);

	//exibe a section resultado
	let divResult = document.querySelector('.vetUn-resultante');
	divResult.style.display = 'block';

	//recebe campos da secao resultado
	let compIFinal = divResult.querySelector('.resI');
	let compJFinal = divResult.querySelector('.resJ');
	let compKFinal = divResult.querySelector('.resK');
	let modFinal = divResult.querySelector('.modulo');

	//exibe valores
	compIFinal.value = compIRes;
	compJFinal.value = compJRes;
	compKFinal.value = compKRes;
	modFinal.value = modRes;
}

caculaModulo = function(compI, compJ, compK) {
	mod = Math.sqrt(Math.pow(compI, 2) + Math.pow(compJ, 2) + Math.pow(compK, 2));
	return mod;
}

