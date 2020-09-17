// 
// Variables Globales.
// Se inician variables para desarrollar posteriormente la lógica del juego.
var aTheCards= new Array(
				{name:'1', selected:false, imagen:"img/La-Bandera.png"}, 
				{name:'2', selected:false, imagen:"img/La-Catrina.png"},
				{name:'3', selected:false, imagen:"img/La-Munieca.png"}, 
				{name:'4', selected:false, imagen:"img/La-Piniata.png"},
				{name:'5', selected:false, imagen:"img/El-Charro.png"}, 
				{name:'6', selected:false, imagen:"img/El-Mariachi.png"},
				{name:'7', selected:false, imagen:"img/El-Rehilete.png"}, 
				{name:'8', selected:false, imagen:"img/El-Taco.png"},
				{name:'1', selected:false, imagen:"img/La-Bandera.png"}, 
				{name:'2', selected:false, imagen:"img/La-Catrina.png"},
				{name:'3', selected:false, imagen:"img/La-Munieca.png"}, 
				{name:'4', selected:false, imagen:"img/La-Piniata.png"},
				{name:'5', selected:false, imagen:"img/El-Charro.png"}, 
				{name:'6', selected:false, imagen:"img/El-Mariachi.png"},
				{name:'7', selected:false, imagen:"img/El-Rehilete.png"}, 
				{name:'8', selected:false, imagen:"img/El-Taco.png"}
				);
var theTryes=0;
var move1 = move2 = "";
var player1 = player2 = "";
var numCards = 16;
// Función "central" ya que, las operaciones empiezan en cuanto se cargan todos los elementos del "ViewPort"
window.onload = function () {
	document.getElementById("theHitIt").onclick=f_BeginGame;
	
	for (var i = numCards-1 ; i >= 0; i--) {
		document.getElementById(i.toString()).onclick = f_turnCard;
	}

};
// En esta función se llevan a cabo 3 cosas; la primera es quitar lo opaco a toda el área del tablero
// después con el método estático "random" del objeto "Math", se ordena de manera aleatoria el arreglo de
// números (en este caso, para nosotros, son las cartas), finalmente una vez que se tienen "mescladas" las
// cartas, se asigna ese valor aleatorio a cada celda. Recordemos que es un juego de memoria, con esto se
// prendente dar la impresión de que cada par es puesto en diferente posición del tablero cada vez.
function f_BeginGame(evt) {
	// Deja de estar opaco el tablero.
	var tmpGameBoard=document.getElementById("theMemGame");
	tmpGameBoard.style.opacity=1;
	$("#theHitIt").hide();
	
	// Se mesclan las cartas.
	aTheCards.sort(function() { return Math.random() - 0.5; });

	// Se asigna a cada "celda" el numero aleatorio que le corresponde.
	for (var i = numCards-1 ; i >= 0; i--) {
		var tmpCard=aTheCards[i].imagen;
		var tmpCell=document.getElementById(i.toString());
		tmpCell.dataset.thevalue=tmpCard;
	}
}
// Se comienza el desarrollo de la "selección" de cartas, es decir, el efecto de voltearlas que es simplemente
// el cambio de color de la celda, se toma el evento desde el objeto "windows" de alli se asigna la carta
// selecionada, por su valor de "id", a la variable del "player2" (Por que el player2?) y después se obtiene
// el movimiento que hizo, es decir, la carta que selección a traves del valor del campo "data-" llamado
// "thevalue", que es recuperado aquí mismo, al extraer del evento capturado desde "wondow", que es un numéro
// asignado aleatoriamenta al momento de "barajear" las cartas.
// Después se detecta, con una bifurcación "If", si el "move1" esta vacio, es decir, no se ha hecho movimiento, 
// se pregunta después si el evento a sido sobre la misma posición, evaluando si el valor de la variable en el 
// arreglo llamada "selected",en el caso de player2, es diferente de "true" lo mismo para el player1 y si las 
// tres concidiones son verdaderas, entonces, el valores boleano "true" se asignan dentro del arreglo, en la
// variable "selected" par cada uno de los jugadores y además, se llama a la función f_changeColor.
// Si alguas de las evaluaciones es falsa, se va a la sección del "else" en donde solo  manda a llamar a la 
// de funciónm cambio de color.
// La evaluación de si "move1" es diferente de ""(vacio), es decir, no se a jugado, tiene código en su parte del
// "else", en este caso un "else if" otra bifurcación, en esta se evalua si "move2" es diferente al valor "void",
// si es verdadero quiere decir que hay jugada por lo tanto, primero manda a cambiar el color de la celda y
// despues, iuguala las variables "move1" con "move2" y "player1 con "player2", y se manda a llamar a la función
// de cambio de color.

// Parte complementaria. A continuación se describe el procedimiento ya terminado; en la parte verdadera de la
// bifurcación que evalua si movimiento uno(move1) y movimiento dos(move2) son iguales y si es verdadero el 
// valor contenido en la varible "selected" dentro del objeto arreglo de cartas para ambos jugadores, se le 
// agrego despues de la llamada a la función de cambiar color, las funciones de limpiar variable "f_changeColor" y
// a la función de verificar "f_verified". A la parte del "else if" de esta misma bifurcación, en donde evalua
// si el valor d "player1" es diferente a el valor de "player2", en su parte verdadera, se agrego un método 
// estático "setTimeOut", esto es con el fin de dar el efecto de "tapar de nuevo" las cartas, despues de 800
// milisegundos y después, llamar a la función de limpiar variables "f_CleanVariebles".
function f_turnCard(e) {
	var tmpEvent=window.event;	
	player2 = tmpEvent.target.id;
	move2 = tmpEvent.target.dataset.thevalue;
	
	console.log("player2->" + player2 + ", move2->" + move2);
	
	if(move1!==""){
		
		if (move1===move2 && 
			aTheCards[parseInt(player2)].selected !== true && 
			aTheCards[parseInt(player1)].selected !== true) {
		
			aTheCards[parseInt(player2)].selected = true;
			aTheCards[parseInt(player1)].selected = true;
			
			f_changeCard(player2,move2);
			
			f_CleanVariables();
			f_verified();
		} else if(player1 != player2){
			setTimeout(function () {
				f_changeCard(player1,"img/Trasera_1.png");
				f_changeCard(player2,"img/Trasera_1.png");
				f_CleanVariables();
			},800);
			f_changeCard(player2,move2);
		}
		
	}else if(move2!=="void"){
		f_changeCard(player2,move2);
		// Este intercambio lo hace asumiento que no se hizo la jugada 1 por el jugador 1, por lo que, los 
		// invierte?????? y establece que es la primera juagada.
		move1=move2;
		player1=player2;
		
	}
}
// Esta función simplemente coloca un valor de cadena vacia a las variables de jugada y jugador.
function f_CleanVariables() {
	move1 = move2 = "";
	player1 = player2  = "";
	
}
// Esta función verifica si todos los valores booleanos de la varible "selected" dentro del arreglo de
// cartas, tiene el valor de "true", si el conteo es igual al número de cartas, el juego a terminado.
function f_verified() {
	var theHits=0;
	for (var i = numCards-1 ; i >= 0; i--) {
		if(aTheCards[i].selected){
			theHits++;
		}
	}
	if(theHits==numCards){
		alert("¡Bien Hecho!");
	}
}

function f_changeCard(pos_player2, num_move2) {
	document.getElementById(pos_player2.toString()).src = num_move2 ;
}