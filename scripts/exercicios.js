window.onload = function() {
	
	document.getElementById('enviaResp').addEventListener('click', correcao, false);
};

function correcao() {
	
	let totQuests, totAcertos;

	let ex1 = document.getElementsByName('ex1');
	let ex2 = document.getElementsByName('ex2');
	let ex3 = document.getElementsByName('ex3');
	let ex4 = document.getElementsByName('ex4');

	if (ex1[3].checked) {
		totAcertos++;
		totQuests++;	
	}
	else
		totQuests++;

	if (ex2[2].checked) {
		totAcertos++;
		totQuests++;	
	}
	else
		totQuests++;

	if (ex3[3].checked) {
		totAcertos++;
		totQuests++;
	}
	else
		totQuests++;

	if (ex4[3].checked) {
		totAcertos++;
		totQuests++;
	}
	else {
		totQuests++;
	}

	switch((totAcertos/totQuests)*100) {
		case 100:
			alert ("Excelente! Você  obteve 100% de acerto!");
		case 75:
			alert ("Muito bom! Você obteve 75% de acerto!");
		case 50:
			alert ("Você obteve 50% de acerto. Que tal ler novamente sobre a matéria?");
		case 25:
			alert ("Ops, você obteve apenas 25% de acerto. Podemos melhorar!");
		case 0:
			alert ("Você não acertou nenhuma questão, mas não se preocupe, relea a matéria clicando aqui e tenha a certeza que terá 100% de acerto da próxima vez!");

	}
}