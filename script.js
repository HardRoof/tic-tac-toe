const gameBoardContainer = document.querySelector("#gameBoardContainer")
const body = document.body
const container = document.querySelector("#container")
let gameBoard = ["", "", "","", "", "","", "", ""]

const GameBoard = (() => {
  const createGameBoard = () => {
    const NumberOfCells = 9
    for (let i = 0; i < NumberOfCells; i++) {
      cells = document.createElement('div');
      gameBoardContainer.appendChild(cells);
      cells.setAttribute("name", "nameCells");
      cells.dataset.position = i
      cells.classList.add('classCells');
      cells.setAttribute("onclick", "attack(this)")
    }
    classCells = document.getElementsByName('nameCells'); //PS: NodeList and live
  };

  const player = (name, weapon) => {
    let attacked = false
    return {name, weapon, attacked};
  };
  const user = player('user', "X");
  const computer = player('computer', "O");

  const playRound = (e) => {
    draw = true
    userAttack(e)
    computerAttack(e)
  }

  const userAttack = (e) => {
    if ((e.innerText == "") && (user.attacked == false)) {
      user.attacked = true
      gameBoard.splice(arrayPosition, 1, user.weapon);
      e.innerText = user.weapon
      checkWinner()
    }
  }

  const computerAttack = (e) => {
    if ((e.innerText == "") && (user.attacked == true)) {
      user.attacked = false
      gameBoard.splice(arrayPosition, 1, computer.weapon);
      e.innerText = computer.weapon
      checkWinner()
    }
  }

  const checkWinner = () => {
    for (let i = 0; i < 7; i+=3) {
      if ((gameBoard[i] == gameBoard[i+1]) && (gameBoard[i] == gameBoard[i+2]) && (gameBoard[i] != "")) {
        gameOver()
      }
    }
    for (let i = 0; i < 3; i++) {
      if ((gameBoard[i] == gameBoard[i+3]) && (gameBoard[i] == gameBoard[i+6]) && (gameBoard[i] != "")) {
        gameOver()
      }
    }
    if (gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8] && gameBoard[0] != "") {
      gameOver()
    }
    else if (gameBoard[2] == gameBoard[4] && gameBoard[2] == gameBoard[6] && gameBoard[2] != "") {
      gameOver()
    }
    else if (gameBoard.includes("") == false && draw == true) {
      user.attacked = null
      gameOver()
    }
  }

  const gameOver = () => {
    draw = false
    classCells.forEach(div => {
      div.removeAttribute("onclick")
    });
    scoreBoard = document.createElement('div');
    scoreBoard.id = "scoreBoardID"
    container.appendChild(scoreBoard)
    scoreBoard.appendChild(document.createTextNode("The winner is")) 

    newSpan = document.createElement('SPAN')
    scoreBoard.appendChild(newSpan)

    if (user.attacked == true) {
      newSpan.innerText = `${user.weapon}`
    }
    else if (user.attacked == false){
      newSpan.innerText = `${computer.weapon}`
    }
    else if (user.attacked == null){
      newSpan.innerText = "No one!"
    }

    container.classList.add('blur');

    restartBtn = document.createElement('button');
    scoreBoard.appendChild(restartBtn)
    restartBtn.type = "button"
    restartBtn.textContent = "Play again"
    restartBtn.addEventListener("click", () => {
      container.classList.remove("blur");
      scoreBoard.remove()
      gameBoard = ["", "", "","", "", "","", "", ""]
      classCells.forEach(div => {
        div.innerText = ""
      });
      classCells.forEach(div => {
        div.setAttribute("onclick", "attack(this)")
      });
    user.attacked = false
    })
  }

  return {
    createGameBoard,
    playRound,
    player,
    user,
    computer,
  }
})();

GameBoard.createGameBoard()
function attack(e) {
  arrayPosition = e.getAttribute("data-position")
  GameBoard.playRound(e)
}
