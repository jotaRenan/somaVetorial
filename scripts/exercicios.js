window.onload = function() {
	
	document.getElementById('enviaResp').addEventListener('click', correcao, false);
};

function correcao() {
	let caixaResultEl = document.querySelector("#resultExcs"), 
		respEspEl = document.querySelector("#respSpace");
		totAcertos = 0, 
		totQuests = 4,
		razao = 0,
		stringResult = "",
		ex1 = document.getElementsByName('ex1'),
		ex2 = document.getElementsByName('ex2'),
		ex3 = document.getElementsByName('ex3'),
		ex4 = document.getElementsByName('ex4');

	if (ex1[3].checked) {
		totAcertos+=1;	
		console.log("asdsa1");
	}


	if (ex2[2].checked) {
		totAcertos++;
		console.log("asdsa2");
	}


	if (ex3[3].checked) {
		totAcertos++;
	}

	if (ex4[3].checked) {
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