const gameManager = (() => {
  let board = Board();
  let gameOver = false;
  let winner = null;
  let currentTurn = Math.random() < 0.5 ? "O" : "X";
  function updateTurn() {
    currentTurn == "X" ? (currentTurn = "O") : (currentTurn = "X");
  }

  function checkWinner() {}
  return {
    board,
    gameOver,
    currentTurn,
    winner,
    checkWinner,
    updateTurn,
  };
})();
function Board() {
  const board = new Array(9).fill(null);

  function isSlotAvailable(index) {
    return board[index] == null ? true : false;
  }
  return {
    board,
    isSlotAvailable,
  };
}
const displayController = (() => {
  function createBoard() {
    /* Create an empty board */
    let board = document.createElement("div");
    board.className = "board";

    for (let i = 0; i < 9; i++) {
      let square = document.createElement("div");
      square.className = "square";
      square.id = i;
      square.addEventListener("click", () => {
        populateSquare(square);
      });

      board.appendChild(square);
    }

    document.body.appendChild(board);
  }

  function createDashboard() {
    let turnIndicator = document.createElement("h2");
    turnIndicator.id = "turn-indicator";
    turnIndicator.innerText = `Current turn: ${gameManager.currentTurn}`;

    document.body.appendChild(turnIndicator);
  }

  function populateSquare(square) {
    if (gameManager.gameOver) {
      console.log("Game is over");
      return false;
    } else if (!gameManager.board.isSlotAvailable([square.id])) {
      console.log("Square is taken");
      return false;
    } else {
      if (gameManager.currentTurn === "X") {
        gameManager.board[square.id] = "X";
        square.innerText = "X";
        gameManager.updateTurn();
        console.log("Played X");
      } else {
        gameManager.board[square.id] = "O";
        square.innerText = "O";
        gameManager.updateTurn();
        console.log("Played O");
      }
    }
  }

  return {
    createBoard,
    createDashboard,
    populateSquare,
  };
})();

displayController.createBoard();
displayController.createDashboard();

function Player(piece) {
  return {
    piece,
  };
}
