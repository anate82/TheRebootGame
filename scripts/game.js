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
}
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
        var timerId = setInterval((function () {
            if (diceRoll === 0){
                clearInterval(timerId);
                player1.direction = 1;
                this.runEvent(this.cell);
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
        }).bind(this),1000);
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
    this.moveTwoPosition = function (){
        this.move(2);
    }
    this.moveTwoBack = function (){
        this.direction = -1;
        this.move(2);
    }
    this.resetGame = function (){
        this.direction = -1;
        this.move (23);
    }
    this.moveFivePosition = function (){
        this.move (5);
    }


    this.runEvent = function (cell) {
        switch(cell) {
            case 6:
            case 12:this.moveTwoPosition ();
                alert("Mueve 2 posiciones");
                    break;
            case 9:
            case 16: this.moveTwoBack ();
                alert("Mueve 2 posiciones hacía atrás");
                 break;
            case 24:this.resetGame ();
                alert("Ohhh...vuelves a empezar");
                    break;
            case 18:this.moveFivePosition ();
                alert("Mueve 5 posiciones")
                    break; 
        }
    }
};

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
        this.popup.addEventListener('click', e => {
            this.popup.style.display = "none";
        });
    }
}
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
    if (player1.cell <= 33 && player1.cell > 31 ||player1.cell <= 23 && player1.cell > 19 || player1.cell <= 5 && player1.cell > 0){
        console.log(player1.cell);
        player1.moveLeft();
    } else if (player1.cell <= 31 && player1.cell > 29 || player1.cell <= 19 && player1.cell > 15){
        console.log(player1.cell);
        player1.moveUp();
    } else if (player1.cell === 35 || player1.cell <= 29 && player1.cell > 26 || player1.cell <= 15  && player1.cell > 10) {
        console.log(player1.cell);
        player1.moveRight();
    } else if (player1.cell === 34 || player1.cell === 33 || player1.cell <= 26 && player1.cell > 23 || player1.cell <= 10 && player1.cell > 5) {
        console.log(player1.cell);
        player1.moveDown();
    }
}

function moveDice(dice,diceResult){
    var cont = 0;
    var timerIdDice = setInterval (function () {
        cont++;
        switch (Math.floor((Math.random()*6)-1)) {
            case 1: document.getElementById("diceImage").src =dice.side1;
                    break;
            case 2: document.getElementById("diceImage").src =dice.side2;
                    break;
            case 3: document.getElementById("diceImage").src =dice.side3;
                    break;
            case 4: document.getElementById("diceImage").src =dice.side4;
                    break;
            case 5: document.getElementById("diceImage").src =dice.side5;
                    break;
            case 6: document.getElementById("diceImage").src =dice.side6;
                    break;
        }
        if (cont === 15) {
            clearInterval(timerIdDice);
            switch (diceResult) {
                case 1: document.getElementById("diceImage").src =dice.side1;
                        break;
                case 2: document.getElementById("diceImage").src =dice.side2;
                        break;
                case 3: document.getElementById("diceImage").src =dice.side3;
                        break;
                case 4: document.getElementById("diceImage").src =dice.side4;
                        break;
                case 5: document.getElementById("diceImage").src =dice.side5;
                        break;
                case 6: document.getElementById("diceImage").src =dice.side6;
                        break;
            }

            alert("Mueves "+ diceResult +" posiciones!!!!");
            player1.move(diceResult);
            return;
        }
    },350);
}


var dice = new Dice();
var player1 = new Player("player1");
var popup = new Popup();
player1.meeple.style.top = player1.posY + "px";
player1.meeple.style.left = player1.posX + "px";




window.onload = function (){
    var diceButton = document.getElementById("dice");
    diceButton.onclick = function () {
        var diceResult = dice.roll();
        moveDice(dice, diceResult);
        popup.show();
        
    }
        document.getElementsByClassName("popup-close")[0].onclick = function () {
            popup.close();
        }
        document.getElementById("btn-popup-close").addEventListener("click", function (){
            popup.close();
    });
 
}

