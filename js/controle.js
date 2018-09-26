
//Variaveis da barra(jogador)

var barraVel; 
var barraPosX;
var barraAltura;
var barraLargura;
var pontosJogador;

//Variaveis da bola

var bolas;
var diametros = new Array(
{'diametro' : 7, 'pontos' : 1},
{'diametro' : 10, 'pontos' : 2},
{'diametro' : 15, 'pontos' : 3}
);

inicializar();

//Função iniciar para "setar" os valores das variaveis
function inicializar()
{
	//Usando o canvas no javascript
	
	canvas = document.getElementById("jogo");
    ctx = canvas.getContext("2d");
	
	//BARRA
	//Definindo os valores da barra
	
	barraAltura = 15;      
	barraLargura = 90;
	
	//Velocidade e posição(inicial) da barra
	
	barraVel = 20;         
	barraPosX = (canvas.width - barraLargura) / 2;
	
	//Criando as bolas
	var primeira = new bola();
	bolas = new Array(primeira);
		
	//Definindo o valor inicial dos pontos
	
	pontosJogador = 0;
	
	//Comando para que o javascript fique de olho se alguma tecla foi pressionada
	
	document.addEventListener('keydown', keyDown);
	
	//Loop que vai fazer a atualização de frames para movimentação dos objetos em tela
	
	setInterval(gameLoop, 30);

}

function gameLoop()
{
	
	//Limpa a tela sobrepondo um novo quadro em branco
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//Desenha a nova posição da barra
	ctx.fillRect(barraPosX, canvas.height - barraAltura, barraLargura, barraAltura);
	
	//Verifica se o array está vazio e cria um novo objeto dentro dele se estiver
	
	if(bolas.length <= 0)
	{
    bolas.push(new bola());
	}
	
	//Desenha a bola
	
	bolas.forEach(function(bola, indice)
	{
	
    ctx.beginPath();
    ctx.arc(bola.bolaPosX, bola.bolaPosY, bola.bolaDiametro, 0, Math.PI * 2, true);
    ctx.fill();
	
	//Bola Caindo
	
	if(bola.bolaPosY <= canvas.height)
    {
        bola.bolaPosY += bola.bolaVel;
    }
    else
    {
         bolas.splice(indice, 1);
    }
	
	//Colisão com a barra
	
	if((bola.bolaPosX > barraPosX && bola.bolaPosX < barraPosX + barraLargura) && bola.bolaPosY >= canvas.height - barraAltura && bola.colisao == false)
    {
        //pontosJogador++;
		pontosJogador += bola.pontos;
        bola.colisao = true;
    }
	else if ((bola.bolaPosY >= canvas.height) && bola.colisao == false)
	{
		bola.bolaPosY = -10;
		alert("DERROTA \nTotal de pontos:" + pontosJogador);
		pontosJogador = 0;

	}
		ctx.font = "32pt Tahoma";
		ctx.fillText(pontosJogador, canvas.width - 70, 50);
	});

}

function bola()
{
	//BOLA
	//Definindo os valores da bola
	
	//Vai criar bolas de tamanho diferentes e pontos diferentes através do Array
	
	var indice = Math.round(Math.random() * (3 - 1) + 1) - 1;
    this.bolaDiametro = diametros[indice]['diametro'];
    this.pontos = diametros[indice]['pontos'];
	
	this.bolaPosX =  Math.random() * 600;
	this.bolaPosY = -10;
	//this.bolaDiametro = 10;
	this.bolaVel = 10;
	//this.bolaVel = Math.random() * (10 - 6) + 6; velocidade random
	this.colisao = false;
}

/*function caiBola()
{
	if(bola.bolaPosY <= canvas.height)
    {
       bola.bolaPosY += bola.bolaVel;
    }
    else
    {
        bola.bolaPosX = Math.random() * 600;
        bola.bolaPosY = -10;
        bola.colisao = false;
    }
}

//Verifica a colisao da bola com a barra

function colideBola()
{
	if((bola.bolaPosX > barraPosX && bola.bolaPosX < barraPosX + barraLargura) && bola.bolaPosY >= canvas.height - barraAltura && bola.colisao == false)
    {
        pontosJogador++;
        bola.colisao = true;
    }
	
	//Desenha o texto de pontuação na tela
	ctx.font = "32pt Tahoma";
	ctx.fillText(pontosJogador, canvas.width - 70, 50);
}*/

//Função que verifica a tecla e move a barra

function keyDown(e)
{
	if (e.keyCode == 37 || e.keyCode == 65)
	{
		if(barraPosX > 0)
		{
			barraPosX -= barraVel;
		}	
	}
	
	if (e.keyCode == 39 || e.keyCode == 68)
	{
		if (barraPosX < (canvas.width - barraLargura))
		{
			barraPosX += barraVel;
		}		
	}
}