/***********************************************
 * PROYECTO FINAL BLOQUE 1.
 *  -Ana Ángulo.
 *  -Romina Elorrieta.
 *  -Luis Sánchez.
 * TÍTULO: "The Reboot Game"
 * Inciado el 07/11/2020.
 * Desarrollado en HTML5, CSS3 y JavaScript.
 * 
 * NOTA AL EQUIPO:
 *      -"tba" es la abreviatura de 
 * "to be added". Usar a discreción de cada uno.
 *      -La inyección de código ballena nos 
 * hace muy felices a todos!! Comentar ballenas
 * a discreción de cada uno. ^___________^
 * ********************************************/

/*
OBJETO DICE: genera una variable de un dado de "faces" caras con
una función que retorna un número aleatorio entre 1 y 6
*/
var Dice = function () {
    this.faces = 6;
    //Aquí podemos implementar el dado animado.
    this.roll = function () {
        var randomNumber = Math.floor((Math.random()*this.faces)+1);
        return randomNumber;
    }
};
/* 
OBJETO PLAYER: genera una variable de un jugador con las caracterísitcas
nombre del jugador, posicion en el tablero, contador interior 
de movimientos, estado interior de actividad y color. Características como
el nombre ó el color, se recogen por entrada de teclado.
*/
var Player = function (player) {
    this.name = "";
    this.posX = 100;   
    this.posY = 620;
    this.cell = 1;
    this.moveCount = 0;//--->tba
    this.direction = 1;
   //this.color = "";--->tba
    this.active = false;
    this.meeple = document.getElementById(player);

    this.move = function(diceRoll) {
        var timerId = setInterval(function () {
            if (diceRoll === 0){
                clearInterval(timerId);
                player1.direction = 1;
                if(player1.cell === 36) {
                    alert("You win");
                }
                return;
            }
            diceRoll--;
            if (diceRoll > 0 && player1.cell === 36) {
                player1.direction = -1;
            } 
            if (player1.direction === -1) {
                player1.cell--;
                moveOnReverse();
            } else {
                player1.cell++;
                moveOnBoard();
            }
        },1000);
    }
/*
FUNCIONES DE MOVIMIENTO: pequeñas funciones propias del objeto Player que
calculan el movimiento de la ficha en las cuatro direcciones en el tablero.
*/
    this.moveRight = function () {
        this.posX += 160.8;
        this.meeple.style.left = this.posX + "px";
    }
    this.moveUp = function () {
        this.posY -= 105;
        this.meeple.style.top = this.posY + "px";
    }
    this.moveDown = function () {
        this.posY += 105;
        this.meeple.style.top = this.posY + "px";
    }
    this.moveLeft = function () {
        this.posX -= 160.8;
        this.meeple.style.left = this.posX + "px";
    }
};
/*
OBJETO BOARD: genera el tablero de juego con un array de 6x6, un dado y un jugador.
*/
var Board = function () {
    this.matrix = [];  
    this.generateBoard = function () {
        for ( var y = 0; y < 6; y++ ) {   
            this.matrix[ y ] = [];    
            for ( var x = 0; x < 6; x++ ) {        
                this.matrix[ y ][ x ] = "";    
            }
        }
    }
};
function moveOnBoard(){
    if (player1.cell >= 7 && player1.cell < 12 || player1.cell >= 25 && player1.cell < 28 || player1.cell >= 35 && player1.cell < 36 ) {
        player1.moveUp();
    } else if (player1.cell >=12 && player1.cell < 17 || player1.cell >= 28 && player1.cell < 31 || player1.cell === 36){ 
        player1.moveLeft();
    } else if (player1.cell >= 17 && player1.cell < 21 || player1.cell >= 31 && player1.cell < 33){
        player1.moveDown();
    } else {
        player1.moveRight();
    }
}
function moveOnReverse(){
    if (player1.cell === 35){
        player1.moveRight();
    } else if (player1.cell === 34){
        player1.moveDown();
    } else if (player1.cell <= 33 && player1.cell > 31){
        player1.moveLeft();
    } else {
        player1.moveUp();
    }

}

var dice = new Dice();
var player1 = new Player("player1");
player1.meeple.style.top = player1.posY + "px";
player1.meeple.style.left = player1.posX + "px";

window.onload = function (){
    var diceButton = document.getElementById("dice");
    diceButton.onclick = function () {
        var diceResult = dice.roll();
        document.getElementById("showDice").innerText = diceResult;
        player1.move(diceResult);
    }
}


/*LO MÁS POSIBLE ES QUE NO LO NECESITEMOS
switch(dado){
    case 1:mostrar cara 1;
    break;
    case 2:mostrar cara 2;
    break;
    case 3:mostrar cara 3;
    break;
    case 4:mostrar cara 4;
    break;
    case 5:mostrar cara 5;
    break;
    case 6:mostrar cara 6;
    break;
}
*/
