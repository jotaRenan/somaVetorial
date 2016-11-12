window.onload = function() {
	
	document.getElementById('enviaResp').addEventListener('click', correcao, false);
};

function correcao() {
	let caixaResultEl = document.querySelector("#resultExcs"), 
		respEspEl = document.querySelector("#respSpace"),
		totAcertos = 0, 
		totQuests = 4,
		razao = 0,
		stringResult = "",
		ex1 = document.querySelector('.ex1'),
		ex2 = document.querySelector('.ex2'),
		ex3 = document.querySelector('.ex3'),
		ex4 = document.querySelector('.ex4');

	if (ex1.querySelector('.correto').checked) {
		totAcertos++;	
	}


	if (ex2.querySelector('.correto').checked) {
		totAcertos++;
	}


	if (ex3.querySelector('.correto').checked) {
		totAcertos++;
	}

	if (ex4.querySelector('.correto').checked) {
		totAcertos++;
	}

	caixaResultEl.style.display = "block";
	console.log(totQuests);
	console.log(totAcertos);
	razao = ((totAcertos/totQuests)*100);
	console.log(razao);


	switch(razao) {
		case 100:
			stringResult = "Excelente! Você  obteve 100% de acerto!";
			break;
		case 75:
			stringResult = "Muito bom! Você obteve 75% de acerto!";
			break;
		case 50:
			stringResult = "Você obteve 50% de acerto. Que tal ler novamente sobre a matéria?";
			break;
		case 25:
			stringResult = "Ops, você obteve apenas 25% de acerto. Podemos melhorar!";
			break;
		case 0:
			stringResult = "Você não acertou nenhuma questão, mas não se preocupe, releia a matéria em 'Como Funciona' e tenha a certeza que terá 100% de acerto da próxima vez!";
			break;

	}

	respEspEl.textContent = stringResult;
}