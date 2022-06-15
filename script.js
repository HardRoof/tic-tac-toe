const container = document.querySelector("#container");
const PlayerOne = document.querySelector("#PlayerOne");
const PlayerTwo = document.querySelector("#PlayerTwo");
let gameBoard = ["", "", "","", "", "","", "", ""];

//Main function(Module)
const GameBoard = (() => {
  //Creates game's board 
  const createGameBoard = () => {
    const NumberOfCells = 9;
    for (let i = 0; i < NumberOfCells; i++) {
      cells = document.createElement('div');
      document.querySelector("#gameBoardContainer").appendChild(cells);
      cells.setAttribute("name", "nameCells");
      cells.dataset.position = i
      cells.classList.add('classCells');
      cells.setAttribute("onclick", "attack(this)");
    }
    classCells = document.getElementsByName('nameCells'); //PS: NodeList and live
  };

  //To create two players(Factory function)
  const player = (name, weapon) => {
    let attacked = false;
    return {name, weapon, attacked};
  };

  //Creates two players
  const createPlayers = () => {
    user = player(PlayerOne.value, "X");
    computer = player(PlayerTwo.value, "O");
  }

  //Plays a round of the game(Activated by EventListener)
  const playRound = (e) => {
    draw = true;//Sets draw initial state
    userAttack(e);
    computerAttack(e);
  }

  const userAttack = (e) => {
    if ((e.innerText == "") && (user.attacked == false)) {
      user.attacked = true;
      gameBoard.splice(arrayPosition, 1, user.weapon);
      e.innerText = user.weapon;
      checkWinner();
    }
  }

  const computerAttack = (e) => {
    if((PlayerTwo.value == "AI Bot 🤖") && (user.attacked == true)){ //If in case is the bot is playing
      user.attacked = false;
      do { //Do.. while loop
        randomNumber = Math.floor(Math.random() * (9)); 
      }
      while (gameBoard[randomNumber] != ""); //If condition is true, the loop will start over again, otherwise it ends.
    gameBoard.splice(randomNumber, 1, computer.weapon); 
    classCells[randomNumber].innerText = computer.weapon;
    checkWinner();
    }
    else if ((e.innerText == "") && (user.attacked == true)) {
      user.attacked = false;
      gameBoard.splice(arrayPosition, 1, computer.weapon);
      e.innerText = computer.weapon;
      checkWinner();
    }
  }
//Checks if there's a winner at the end of an attack
  const checkWinner = () => {
    for (let i = 0; i < 7; i+=3) {
      if ((gameBoard[i] == gameBoard[i+1]) && (gameBoard[i] == gameBoard[i+2]) && (gameBoard[i] != "")) {
        gameOver();
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if ((gameBoard[i] == gameBoard[i+3]) && (gameBoard[i] == gameBoard[i+6]) && (gameBoard[i] != "") && (draw != false)) {
        gameOver();
        break;
      }
    }
    if (gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8] && gameBoard[0] != "") {
      gameOver();
    }
    else if (gameBoard[2] == gameBoard[4] && gameBoard[2] == gameBoard[6] && gameBoard[2] != "") {
      gameOver();
    }
    else if (gameBoard.includes("") == false && draw == true) {
      user.attacked = null
      gameOver();
    }
  }

  const gameOver = () => {
    draw = false; //To avoid to check for an draw after end of the game
    classCells.forEach(div => {
      div.removeAttribute("onclick");
    });
    scoreBoard = document.createElement('div');
    scoreBoard.id = "scoreBoardID";
    container.appendChild(scoreBoard);
    scoreBoard.appendChild(document.createTextNode("The winner is")) ;

    newSpan = document.createElement('SPAN');
    scoreBoard.appendChild(newSpan);

    if (user.attacked == true) {
      newSpan.innerText = `${PlayerOne.value}`;
    }
    else if (user.attacked == false){
      newSpan.innerText = `${PlayerTwo.value}`;
    }
    else if (user.attacked == null){
      newSpan.innerText = "No one!";
    }
    container.classList.add('blur'); //Creates the blur effect when the game's over
    restartBtn = document.createElement('button');
    scoreBoard.appendChild(restartBtn);
    restartBtn.type = "button";
    restartBtn.textContent = "Play again";
    restartBtn.addEventListener("click", clear);
    user.attacked = false;
  }

  const clear = () => {
    container.classList.remove("blur");
    if (typeof scoreBoard !== "undefined") scoreBoard.remove();
    gameBoard = ["", "", "","", "", "","", "", ""];
    classCells.forEach(div => {
      div.innerText = "";
    });
    classCells.forEach(div => {
      div.setAttribute("onclick", "attack(this)");
    });
  }
  
  return {
    createGameBoard,
    playRound,
    player,
    createPlayers,
    clear,
  }
})();

GameBoard.createGameBoard() //Call createGameBoard
function attack(e) {
  arrayPosition = e.getAttribute("data-position");
  GameBoard.playRound(e);
}

const formPlayer = document.getElementById("formPlayer");
const initialPage = document.querySelector("#initialPage");

formPlayer.addEventListener("submit", (e)=>{
  e.preventDefault(); //To prevent submission of the form
  GameBoard.createPlayers(); // Call createPlayers
  initialPage.classList.add('hidden'); //Hides Initial page
  container.classList.remove("hidden"); //Reveals GameBoard
})

//Resets the game to its initial state
newGameBtn = document.querySelector('.newGame');
newGameBtn.addEventListener("click", () =>{
  GameBoard.clear();
  initialPage.classList.remove('hidden');
  container.classList.add("hidden");
  PlayerOne.value = "Player one";
  PlayerTwo.value = "";
})