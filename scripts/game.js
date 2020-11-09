/*
Objeto dice: genera una variable de un dado de "faces" caras con
una función que retorna un número aleatorio entre 1 y 6
*/
var Dice = {
    faces:6,
    roll:function(){
        var randomNumber = Math.floor((Math.random()*this.faces)+1);
        return randomNumber;
    }
};
/* 
Objeto player: genera una variable de un jugador con las caracterísitcas
nombre del jugador, posicion en el tablero, contador interior 
de movimientos, estado interior de actividad y color.
*/
var Player = {
    name :"",
    posX: 0,
    posY:0,
    moveCount:0,
    color:"",
    active:false
};
/*
Objeto Board: genera el tablero de juego con un array de 6x6
*/
var Board = {
    matrix : function(){
        var matrixBoard = [];  
        for ( var y = 0; y < 6; y++ ) {   
            matrix[ y ] = [];    
            for ( var x = 0; x < 6; x++ ) {        
                matrix[ y ][ x ] = "";    
            }
        }
    }
};



/*
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
