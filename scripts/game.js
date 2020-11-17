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
    this.diceFaces = {
        side1 : "assets/images/d1.png",
        side2 : "assets/images/d2.png",
        side3 : "assets/images/d3.png",
        side4 : "assets/images/d4.png",
        side5 : "assets/images/d5.png",
        side6 : "assets/images/d6.png"
    };

    this.animateDice = function (diceResult) {
        var cont = 15;
        var timerIdDice = setInterval (function () {
            snd.play();
            cont--;
            let random = Math.floor((Math.random()*6)+1);
            document.getElementById("diceImage").src = this.diceFaces['side'+random];
            if (cont === 0) {
                clearInterval(timerIdDice);
                document.getElementById("diceImage").src = this.diceFaces['side'+diceResult];
                if (diceResult === 1) {
                    popup.message("Mueves "+ diceResult +" posicion!!!!");
                    popup.show();
                } else {
                    popup.message("Mueves "+ diceResult +" posiciones!!!!");
                    popup.show();
                }
                snd.pause();
                //game.move(player,diceResult);
                return;
            }
        }, 550);
    }
};

/* 
OBJETO PLAYER: genera una variable de un jugador con las caracterísitcas
nombre del jugador, posicion en el tablero, contador interior 
de movimientos, estado interior de actividad y color. Características como
el nombre ó el color, se recogen por entrada de teclado.
*/

var Player = function (meeple) {
   // this.name = "";
    this.posX = 100;   
    this.posY = 620;
    this.cell = 1;
    this.moveCount = 0;//--->tba
    this.direction = 1;
   //this.color = "";--->tba
    this.active = false;
    this.meeple = meeple;
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
};


//clase constructora Game

var Game = function (){
    this.dice = new Dice();
    this.activePlayer = 2;

    this.changeActivePlayer = function (){
        if (this.activePlayer === 1){
            this.activePlayer = 2;
        } else {
            this.activePlayer = 1;
        }
    }

    this.rollDice = function() {
        document.getElementById("diceImage").style.display = "inline-block";
        var roll = this.dice.roll();
        snd.play();
        let faceCont = 10;
        var diceTimer = setInterval(function (){
            faceCont--;
            let random = Math.floor((Math.random()*6)+1);
            document.getElementById("diceImage").src = this.dice.diceFaces['side'+random];
            if (faceCont === 0) {
                clearInterval(diceTimer);
                document.getElementById("diceImage").src = this.dice.diceFaces['side'+roll];
                if (roll === 1) {
                    popup.message("Mueves "+ roll +" posicion!!!!");
                    popup.show();
                } else {
                    popup.message("Mueves "+ roll +" posiciones!!!!");
                    popup.show();
                }
            }
        },300);
        //dice.animateDice(this,player,roll);
        return roll;//genera un valor aleatorio que será las posiciones a mover la ficha
    }


    this.move = function(player,diceRoll) {
        var snd = new Audio ("/assets/music/Astronomia.mp3");
        var sndFinal = new Audio ("/assets/music/Noisestorm.mp3")
        var timerId = setInterval((function () {
            if (diceRoll === 0){
                clearInterval(timerId);
                snd.pause();
                player.direction = 1;
                this.runEvent(player);
                if(player.cell === 36) {
                    var timeout = setTimeout(function() {
                        sndFinal.play();
                      }, 3000);
                    popup.message("Felicidades has entregado el proyecto!!! te has ganado unas buenas vacaciones");
                    popup.show();
                }
                return;
            }
            diceRoll--;
            if (diceRoll > 0 && player.cell === 36) {
                player.direction = -1;
            } 
            if (player.direction === -1) {
                snd.play();
                player.cell--;
                moveOnReverse(player);
                document.getElementById("diceImage").style.display = "none";
            } else {
                player.cell++;
                moveOnBoard(player);
                document.getElementById("diceImage").style.display = "none";
            }
        }).bind(this),1000);
    }
    this.moveTwoPosition = function (player) {
        this.move(player,2);
    }
    this.moveTwoBack = function (player) {
        player.direction = -1;
        this.move(player,2);
    }
    this.startAgain = function (player) {
        player.direction = -1;
        this.move (player,player.cell-1);
    }
    this.moveFivePosition = function (player) {
        this.move (player,5);
    }
    /*FUNCIÓN RUNEVENT: define las casillas en las cuales se producirá
    un evento en el tablero. En base a la casilla en la que caiga el
    jugador, se llamará a una función u otra, y se pueden avanzar ó 
    perder posiciones*/
    this.runEvent = function (player) {
        switch(player.cell) {
            case 6:
            case 12:popup.message("Has estado estudiando mucho, avanzas 2 posiciones para que te veas los recursos adicionales");
                    popup.show();
                    this.moveTwoPosition (player);
                    break;
            case 9:
            case 16:popup.message("¡¡¡No has terminado el lab!!!, retrocede 2 posiciones para que te veas las slides");
                    popup.show();
                    this.moveTwoBack (player);
                    break;
            case 24:
            case 34:popup.message("No has entregado el proyecto a tiempo!!!! Ohhh...vuelves a empezar el bootcamp");
                    popup.show();
                    this.startAgain (player);
                    break;
            case 17:popup.message("Nestor te ayuda con tus dudas y avanzas 5 posiciones!!");
                    popup.show();
                    this.moveFivePosition (player);
                    break;
            case 28:popup.message("El hijo de un programador le pregunta a su padre: Papá, ¿Porque el sol nase por el este y se pone por el oeste?  El padre responde: Funciona? No se toca");
                    popup.show();
                    break;
            case 31:popup.message("Programador: Persona que resuelve un problema que tu no sabes que tienes, en una forma que tu no entiendes.");
                    popup.show();
                    break; 
            case 4:
            case 27:popup.message("Llegas tarde..... Te llevas un PUNISHER: Pierdes un turno por listo :(");
                    popup.show();
                    this.moveCount = 1;
                    this.active = false;
                    break;
//******* Revisar pq el popup se cierra cuando se inserta la información en el input ****************/
            case 3:
            case 20:popupQuestion.messageQuestion("Responde a la pregunta, Rebooter: Piedra, papel, tijera, lagarto o ....");
                  popupQuestion.show();
                  
                   break;
        }
    }

    this.moveOnBoard = function (player){
        if (player.cell >= 7 && player.cell < 12 || player.cell >= 25 && player.cell < 28 || player.cell >= 35 && player.cell < 36 ) {
            player.moveUp(player);
        } else if (player.cell >=12 && player.cell < 17 || player.cell >= 28 && player.cell < 31 || player.cell === 36) { 
            player.moveLeft(player);
        } else if (player.cell >= 17 && player.cell < 21 || player.cell >= 31 && player.cell < 33) {
            player.moveDown(player);
        } else {
            player.moveRight(player);
        }
    }

    this.moveOnReverse = function (player) { 
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
}
/*
function checkTurn (){
    if (player1.active){
        console.log("player1 active false");
        player1.active = false;
        player2.active = true; 
    } else {
        console.log("player1 active true");
        player1.active = true;
        player2.active = false; 
    }
}

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
}*/

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

/*OBJETO POPUP: define un objeto de tipo ventana emergente*/
var PopupQuestion = function (){
    this.popupQuestion = document.querySelector(".popup-wrapper-question");
    this.closeQuestion = document.querySelector(".popup-close-question");
    this.messageQuestion = function (message){
       document.getElementById("messagePopUpQuestion").innerText = message;
    }
    this.show = function (){
        this.popupQuestion.style.display = 'block';
    }
    this.close = function (){
        this.popupQuestion.style.display = "none";
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

function moveOnBoard(player) {
    if (player.cell >= 7 && player.cell < 12 || player.cell >= 25 && player.cell < 28 || player.cell >= 35 && player.cell < 36 ) {
        player.moveUp(player);
    } else if (player.cell >=12 && player.cell < 17 || player.cell >= 28 && player.cell < 31 || player.cell === 36) { 
        player.moveLeft(player);
    } else if (player.cell >= 17 && player.cell < 21 || player.cell >= 31 && player.cell < 33) {
        player.moveDown(player);
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
function moveEvent(type){
    if (game.activePlayer === 1){
        var p = player1;
    } else {
        var p = player2;
    }

    if (type === "forward"){
        game.moveTwoPosition(p);
    }
    if (type === "back"){
        game.moveTwoBack(p);
    }
}

function runTurn(diceResult) {
   game.changeActivePlayer(); 
    if (game.activePlayer === 1){
       game.move(player1,diceResult);
   } else {
        game.move(player2,diceResult);
   }
}


/*BUCLE PRINCIPAL DEL JUEGO*/


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
player1.active = true;
player1.meeple.style.top = player1.posY + "px";
player1.meeple.style.left = player1.posX + "px";
player2.meeple.style.top = player2.posY + "px";
player2.meeple.style.left = player2.posX + "px";
player3.meeple.style.top = player3.posY + "px";
player3.meeple.style.left = player3.posX + "px";
player4.meeple.style.top = player4.posY + "px";
player4.meeple.style.left = player4.posX + "px";
var dice = new Dice();
var popup = new Popup();
var snd = new Audio("/assets/music/dice-1.wav");
var game = new Game();
var popupQuestion = new PopupQuestion();

window.onload = function (){
    var diceButton = document.getElementById("diceButton");
    var rollResult = 0;
    var playerIdle = true;//nuestro jugador esta quieto
    diceButton.onclick = function () {
        rollResult = game.rollDice();
        playerIdle = false;
    }
    document.getElementById("popup-close").addEventListener("click", function () {
        if(!playerIdle){
            playerIdle = true;
            runTurn(rollResult);//lanza el dado y mueve la ficha hasta la posicion indicada por  el.
        }
        popup.close();
    });
    document.getElementById("btn-popup-close").addEventListener("click", function (){
        if(!playerIdle){
            playerIdle = true;
            runTurn(rollResult);//lanza el dado y mueve la ficha hasta la posicion indicada por  el.
        }
        popup.close();
    });
    document.getElementById("btn-popup-confirmar").addEventListener("click", function (){
        popupQuestion.close();
        if (document.getElementById("inputPopUp").value === "Spock") {
            popup.message("Correctisimo!!!! Avanzas dos posiciones");
            popup.show(); 
            moveEvent("forward");          
        } else {
            popup.message("Ohhhhh!!!! Me había olvidado de que las personas normales tienen límites.... Retrocedes dos posiciones");
            popup.show();
            moveEvent("back");
        }    
    });
    
    document.getElementById("popup-close-question").addEventListener("click", function () {
        popupQuestion.close();
    });
 
}