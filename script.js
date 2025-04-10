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
  };
})();

const gameManager = (() => {
  let player1 = Player();
  let player2 = Player();

  let currentPlayer;
  let winner = null;
  let isGameOver = false;

  function startGame() {
    // refactor to use form fields
    player1.initPlayer("Lucas", "X");
    player2.initPlayer("Life", "O");

    currentPlayer = Math.random() > 0.5 ? player1 : player2;

    while (!isGameOver) {
      let piece = currentPlayer.getPiece();
      let position = currentPlayer.getPosition();

      if (!board.isSpotEmpty(position)) {
        alert("That spot is not empty! Choose a different one");
      } else {
        board.placePiece(piece, position);

        let currentWinner = board.checkWinner();

        if (currentWinner == null) {
          console.log("No winner yet");
          currentPlayer = currentPlayer == player1 ? player2 : player1;
        } else if (currentWinner == "tie") {
          console.log("Tie!");
          winner = "Tie";
          isGameOver = true;
        } else {
          console.log("We have a winner");
          winner = currentWinner;
          isGameOver = true;
        }
      }
    }
  }

  function getCurrentPlayer() {
    return currentPlayer == player1 ? player1 : player2;
  }

  return {
    startGame,
    getCurrentPlayer,
  };
})();

const displayManager = (() => {
  function createBoard() {
    let grid = document.createElement("div");
    grid.className = "board";

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let square = document.createElement("div");
        square.className = "square";
        square.id = i * 3 + j;
        grid.appendChild(square);
      }
    }

    document.body.appendChild(grid);
  }

  return {
    createBoard,
  };
})();

displayManager.createBoard();

gameManager.startGame();
