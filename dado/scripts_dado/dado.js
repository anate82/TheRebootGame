//Tira el dado
function rollDice() {
    const dice = [...document.querySelectorAll(".dice-list")];
    dice.forEach(die => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6); 
      /*La función "dataset" nos permite acceder a los elementos personalizados como datos dentro del código HTML,
      en éste caso, las caras del dado, que se han identificado dentro de los "li"*/
    });
  }
  

  //Hace el cambio de clases en el CSS durante la animación.
  function toggleClasses(die) {
    //die.classList.toggle("odd-roll");//un solo dado
    die.classList.toggle("even-roll");//dos dados
  }
  

  //obtiene el número aleatorio en min y max. Los define entre 1 y 6 en la llamada 
  //a la función principal.
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  document.getElementById("roll-button").addEventListener("click", rollDice); //evento en el botón.