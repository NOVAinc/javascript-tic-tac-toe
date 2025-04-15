function Player() {
  let playerName;
  let playerPiece;

  function initPlayer(name, piece) {
    playerName = name;
    playerPiece = piece;
  }

  function getName() {
    return playerName;
  }

  function getPiece() {
    return playerPiece;
  }

  function getPosition() {
    return prompt(`Where would you like to place your piece, ${playerName}?`);
  }

  return {
    initPlayer,
    getName,
    getPiece,
    getPosition,
  };
}

const board = (() => {
  const board = new Array(9).fill(null);

  function restart() {
    board.fill(null);
  }

  function isSpotEmpty(spot) {
    return board[spot] == null ? true : false;
  }

  function placePiece(piece, position) {
    board[position] = piece;
    console.log(board[0] + board[1] + board[2]);
    console.log(board[3] + board[4] + board[5]);
    console.log(board[6] + board[7] + board[8]);
  }

  function checkWinner() {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (winningPosition of winningPositions) {
      if (
        board[winningPosition[0]] != null &&
        board[winningPosition[0]] == board[winningPosition[1]] &&
        board[winningPosition[1]] == board[winningPosition[2]]
      ) {
        return winningPosition[0];
      }
    }

    if (board.includes(null)) {
      return null;
    } else {
      return "tie";
    }
  }

  return {
    isSpotEmpty,
    placePiece,
    checkWinner,
    restart,
  };
})();

const gameManager = (() => {
  let player1 = Player();
  let player2 = Player();

  let currentPlayer;
  let winner = null;
  let isGameOver = false;

  function startGame() {
    player1.initPlayer(document.getElementById("player1-name").value, "X");
    player2.initPlayer(document.getElementById("player2-name").value, "O");

    currentPlayer = Math.random() > 0.5 ? player1 : player2;

    displayManager.displayTurn();
  }

  function restartGame() {
    board.restart();
    displayManager.clearGrid();

    currentPlayer = Math.random() > 0.5 ? player1 : player2;

    displayManager.displayTurn();
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function switchPlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  }

  function attemptMove(spot) {
    if (board.isSpotEmpty(spot)) {
      board.placePiece(currentPlayer.getPiece(), spot);
      displayManager.populateSquare(spot, currentPlayer.getPiece());
      if (board.checkWinner() == null) {
        displayManager.displayTurn();
        switchPlayer();
      } else if (board.checkWinner() == "tie") {
        displayManager.displayTie();
      } else {
        displayManager.displayWinner(currentPlayer.getName());
      }
    }
  }

  return {
    startGame,
    getCurrentPlayer,
    switchPlayer,
    attemptMove,
    restartGame,
  };
})();

const displayManager = (() => {
  function createBoard() {
    let grid = document.createElement("div");
    grid.className = "board";

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let square = document.createElement("div");
        let id = i * 3 + j;
        square.className = "square";
        square.id = id;
        square.addEventListener("click", () => gameManager.attemptMove(id));
        grid.appendChild(square);
      }
    }

    document.body.appendChild(grid);
  }

  function displayTurn() {
    document.getElementById("status").innerText = `Current turn: ${gameManager
      .getCurrentPlayer()
      .getName()}`;
  }

  function displayTie() {
    document.getElementById("status").innerText = "Tie!";
  }

  function displayWinner(winner) {
    document.getElementById("status").innerText = `Winner: ${winner}!`;
  }

  function populateSquare(id, piece) {
    let square = document.getElementById(id);
    square.innerText = piece;
  }

  function clearGrid() {
    const squares = document.getElementsByClassName("square");
    for (square of squares) {
      square.innerText = "";
    }
  }

  function showDashboard() {
    const dashboard = document.createElement("div");
    dashboard.innerHTML = `<h2 id="status">Game on</h2>
<form id="form">
  <li>
    <label for="player1-name">Player X</label>
    <input type="text" id="player1-name">
  </li>
  <li>
  <label for="player2-name">Player O</label>
  <input type="text" id="player2-name">
  </li>
  <button id="start-game-button">Start Game</button>
  <button id="restart-game-button">Restart Game</button>
</form>
    `;
    dashboard.className = "dashboard";

    document.body.appendChild(dashboard);

    document.getElementById("form").addEventListener("submit", (event) => {
      event.preventDefault();
    });

    document
      .getElementById("start-game-button")
      .addEventListener("click", () => {
        gameManager.startGame();
      });

    document
      .getElementById("restart-game-button")
      .addEventListener("click", () => {
        gameManager.restartGame();
      });
  }

  return {
    createBoard,
    populateSquare,
    showDashboard,
    displayTurn,
    displayTie,
    displayWinner,
    clearGrid,
  };
})();

displayManager.createBoard();
displayManager.showDashboard();
