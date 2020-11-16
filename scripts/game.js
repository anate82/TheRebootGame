/***********************************************
 * PROYECTO FINAL BLOQUE 1.
 *  -Ana Angulo.
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
    this.side1 = "assets/images/d1.png";
    this.side2 = "assets/images/d2.png";
    this.side3 = "assets/images/d3.png";
    this.side4 = "assets/images/d4.png";
    this.side5 = "assets/images/d5.png";
    this.side6 = "assets/images/d6.png";
};

/* 
OBJETO PLAYER: genera una variable de un jugador con las caracterísitcas
nombre del jugador, posicion en el tablero, contador interior 
de movimientos, estado interior de actividad y color. Características como
el nombre ó el color, se recogen por entrada de teclado.
*/

var Player = function (meeple) {
    this.name = "";
    this.posX = 100;   
    this.posY = 620;
    this.cell = 1;
    this.moveCount = 0;//--->tba
    this.direction = 1;
   //this.color = "";--->tba
    this.active = false;
    this.meeple = meeple;

    this.move = function(diceRoll) {
        var timerId = setInterval((function () {
            if (diceRoll === 0){
                clearInterval(timerId);
                this.direction = 1;
                this.runEvent(this.cell);
                if(this.cell === 36) {
                    popup.message("Felicidades has entregado el proyecto!!! te has ganado unas buenas vacaciones");
                    popup.show();
                }
                return;
            }
            diceRoll--;
            if (diceRoll > 0 && this.cell === 36) {
                this.direction = -1;
            } 
            if (this.direction === -1) {
                this.cell--;
                moveOnReverse(this);
                document.getElementById("diceImage").style.display = "none";
            } else {
                this.cell++;
                moveOnBoard(this);
                document.getElementById("diceImage").style.display = "none";
            }
        }).bind(this),1000);
    }
    /*
    FUNCIONES DE MOVIMIENTO: funciones propias del objeto Player que
    calculan el movimiento de la ficha en las cuatro direcciones en el tablero
    y en base a la casilla en la que caigan.
    */
    this.moveRight = function () {
        this.posX += 160.8;
        this.meeple.style.left = this.posX + "px";
    }
    this.moveUp = function () {
        this.posY -= 107;
        this.meeple.style.top = this.posY + "px";
    }
    this.moveDown = function () {
        this.posY += 107;
        this.meeple.style.top = this.posY + "px";
    }
    this.moveLeft = function () {
        this.posX -= 160.8;
        this.meeple.style.left = this.posX + "px";
    }
    this.moveTwoPosition = function () {
        this.move(2);
    }
    this.moveTwoBack = function () {
        this.direction = -1;
        this.move(2);
    }
    this.resetGame = function () {
        this.direction = -1;
        this.move (23);
    }
    this.moveFivePosition = function () {
        this.move (5);
    }
<<<<<<< HEAD
        
=======
    /*FUNCIÓN RUNEVENT: define las casillas en las cuales se producirá
    un evento en el tablero. En base a la casilla en la que caiga el
    jugador, se llamará a una función u otra, y se pueden avanzar ó 
    perder posiciones*/
>>>>>>> 05596345c8d7e6f9ddf7381b9f49bd7d880f6baf
    this.runEvent = function (cell) {
        switch(cell) {
            case 6:
            case 12:popup.message("Has estado estudiando mucho, avanzas 2 posiciones para que te veas los recursos adicionales");
                    popup.show();
                    this.moveTwoPosition ();
                    break;
            case 9:
            case 16:popup.message("¡¡¡No has terminado el lab!!!, retrocede 2 posiciones para que te veas las slides");
                    popup.show();
                    this.moveTwoBack ();
                    break;
            case 24:
            case 34:popup.message("No has entregado el proyecto a tiempo!!!! Ohhh...vuelves a empezar el bootcamp");
                    popup.show();
                    this.resetGame ();
                    break;
            case 18:popup.message("Nestor te ayuda con tus dudas y avanzas 5 posiciones!!");
                    popup.show();
                    this.moveFivePosition ();
                    break; 
            case 27:popup.message("Llegas tarde..... Te llevas un PUNISHER: Pierdes un turno por listo :(");//pierde un turno, pendiente de finalizar 
                    popup.show();
                    player.active = true;
                    checkTurn(player);
                    break;
//******* Revisar pq el popup se cierra cuando se inserta la información en el input ****************/
   /*        case 2:
            case 3:
            case 4:
            case 5:popup.message("Responde a la pregunta, Rebooter: Piedra, papel, tijera, lagarto o ....");
                   document.getElementById("inputPopUp").style.visibility = "visible";
                   var botonConfirmar = document.getElementById("btn-popup-close");
                   botonConfirmar.innerText = "Confirmar";
                   popup.show();
                   break;*/
        }
    }
    this.changePlayer= function () {
        if(player1.active === true){
            player1.active = false;
            player2.active = true;
        }
        else if(player2.active === true){
            player2.active = false;
            player1.active = true;
        }
    }
};

function answerPopup(player){
    if (document.getElementById("inputPopUp").value === "Spock") {
        popup.message("Correctisimo!!!! Avanzas dos posiciones");
        document.getElementById("inputPopUp").style.visibility = "hidden";
        popup.show();
        player.moveTwoPosition (player);
        document.getElementById("btn-popup-close").innerText = "Cerrar";

    } else {

        popup.message("Ohhhhh!!!! Me había olvidado de que las personas normales tienen límites.... Retrocedes dos posiciones");
        document.getElementById("inputPopUp").style.visibility = "hidden";
        popup.show();
        player.moveTwoBack (player);
        document.getElementById("btn-popup-close").innerText = "Cerrar";
    }
}

/*OBJETO POPUP: define un objeto de tipo ventana emergente*/

var Popup = function (){
    this.popup = document.querySelector(".popup-wrapper");
    this.close = document.querySelector(".popup-close");
    this.message = function (message){
       document.getElementById("messagePopUp").innerText = message;
    }
    this.show = function (){
        this.popup.style.display = 'block';
    }
    this.close = function (){
        this.popup.style.display = "none";
    }
}

/*
OBJETO BOARD: genera el tablero de juego con un array de 6x6, un dado y un jugador.

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
};*/
/*FUNCIÓN MOVEONBOARD: solventa los problemas de giro en el tablero. Se realiza
el movimiento en base al intervalo de casillas en el que se encuentre el jugador*/

<<<<<<< HEAD
function moveOnBoard(){
    if (player1.cell >= 7 && player1.cell < 12 || player1.cell >= 25 && player1.cell < 28 || player1.cell >= 35 && player1.cell < 36 ) {
        player1.moveUp();
    } else if (player1.cell >=12 && player1.cell < 17 || player1.cell >= 28 && player1.cell < 31 || player1.cell === 36){ 
        player1.moveLeft();
    } else if (player1.cell >= 17 && player1.cell < 21 || player1.cell >= 31 && player1.cell < 33){
        player1.moveDown();
=======
function moveOnBoard(player) {
    if (player.cell >= 7 && player.cell < 12 || player.cell >= 25 && player.cell < 28 || player.cell >= 35 && player.cell < 36 ) {
        player.moveUp(player);
    } else if (player.cell >=12 && player.cell < 17 || player.cell >= 28 && player.cell < 31 || player.cell === 36) { 
        player.moveLeft(player);
    } else if (player.cell >= 17 && player.cell < 21 || player.cell >= 31 && player.cell < 33) {
        player.moveDown(player);
>>>>>>> 05596345c8d7e6f9ddf7381b9f49bd7d880f6baf
    } else {
        player.moveRight(player);
    }
}

/*FUNCIÓN MOVEONREVERSE: solventa el problema del movimiento hacia atrás en las
distintas situaciones en las que se puede encontrar ésta condición en el tablero*/

function moveOnReverse(player) {
    if (player.cell <= 33 && player.cell > 31 ||player.cell <= 23 && player.cell > 19 || player.cell <= 5 && player.cell > 0) {
        player.moveLeft(player);
    } else if (player.cell <= 31 && player.cell > 29 || player.cell <= 19 && player.cell > 15) {
        player.moveUp(player);
    } else if (player.cell === 35 || player.cell <= 29 && player.cell > 26 || player.cell <= 15  && player.cell > 10) {
        player.moveRight(player);
    } else if (player.cell === 34 || player.cell === 33 || player.cell <= 26 && player.cell > 23 || player.cell <= 10 && player.cell > 5) {
        player.moveDown(player);
    }
}

/*FUNCIÓN MOVEDICE: genera un número aleatorio entre 1 y 6, el cual utiliza para
mostrar la cara del dado animado. El dado "salta" 15 veces*/

function moveDice (dice, diceResult, player){
    var cont = 15;
    var timerIdDice = setInterval (function () {
        snd.play();
        cont--;
        let random = Math.floor((Math.random()*6)+1);
        console.log(random);
        document.getElementById("diceImage").src = dice['side'+random];
        if (cont === 0) {
            clearInterval(timerIdDice);
            document.getElementById("diceImage").src = dice['side'+diceResult];
            if (diceResult === 1) {
                popup.message("Mueves "+ diceResult +" posicion!!!!");
                popup.show();
            } else {
                popup.message("Mueves "+ diceResult +" posiciones!!!!");
                popup.show();
            }
            snd.pause();
            player.move(diceResult);
            return;
        }
    }, 550);
    document.getElementById("inputPopUp").style.visibility = "hidden";
}

function checkTurn (player){
    if (player1.active){
        player1.active = false;
        player2.active = true; 
    } else {
        player1.active = true;
        player2.active = false; 
    }
}

<<<<<<< HEAD
var dice = new Dice();
var player1 = new Player("player1");
var player2 = new Player("player2");
=======
/*BUCLE PRINCIPAL DEL JUEGO*/

var dice = new Dice();
var player1 = new Player(document.getElementById("player1"));
var player2 = new Player(document.getElementById("player2"));
var player3 = new Player(document.getElementById("player3"));
var player4 = new Player(document.getElementById("player4"));
player2.posX = 100;
player2.posY = 580;
player3.posX = 50;
player3.posY = 580;
player4.posX = 50;
player4.posY = 620;
>>>>>>> 05596345c8d7e6f9ddf7381b9f49bd7d880f6baf
var popup = new Popup();
player1.active = true;
player1.meeple.style.top = player1.posY + "px";
player1.meeple.style.left = player1.posX + "px";
player2.meeple.style.top = player2.posY + "px";
<<<<<<< HEAD
player2.meeple.style.left = player2.posX;  
=======
player2.meeple.style.left = player2.posX + "px";
player3.meeple.style.top = player3.posY + "px";
player3.meeple.style.left = player3.posX + "px";
player4.meeple.style.top = player4.posY + "px";
player4.meeple.style.left = player4.posX + "px";
var snd = new Audio("/assets/music/dice-1.wav");
>>>>>>> 05596345c8d7e6f9ddf7381b9f49bd7d880f6baf

window.onload = function (){
    var diceButton = document.getElementById("diceButton");
    diceButton.onclick = function () {
        document.getElementById("diceImage").style.display = "inline-block";
        var diceResult = dice.roll();
<<<<<<< HEAD
        moveDice(dice, diceResult);
        
        popup.show();   
    }
        document.getElementsByClassName("popup-close")[0].onclick = function () {
            popup.close();
        }
        document.getElementById("btn-popup-close").addEventListener("click", function () {
            popup.close();
    });
    player.changePlayer()
}

=======
        if (player1.active) {
            moveDice(dice, diceResult, player1);
            checkTurn(player1);
        } else if (player2.active) {
            moveDice(dice, diceResult, player2);
            checkTurn(player2);
        }
    }
    document.getElementById("popup-close").addEventListener("click", function () {
        popup.close();
    });
    document.getElementById("btn-popup-close").addEventListener("click", function (){
        /*if (!player1.active && player1.cell >= 2 && player1.cell <= 5) {
            answerPopup(player1);
        } else if (!player2.active && player2.cell >= 2 && player2.cell <= 5) {
            answerPopup(player2);
        }*/
        popup.close();
    });
 
}
>>>>>>> 05596345c8d7e6f9ddf7381b9f49bd7d880f6baf
