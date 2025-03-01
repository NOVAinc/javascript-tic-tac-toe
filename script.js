(function Game() {
  /* Initialize empty board */
  console.log("Initializing match. Creating empty board");
  const board = new Array(9).fill(null);

  /* Create and select player pieces */
  const player1 = Player(prompt("Player 1, what is your piece?"));
  const player2 = Player(prompt("Player 2, what is your piece?"));

  let gameOver = false;
  let winner;
  let currentTurn = Math.random() < 0.5 ? player1.piece : player2.piece;

  console.log(`Player 1: ${player1.piece}`);
  console.log(`Player 2: ${player2.piece}`);
  console.log(`First turn: ${currentTurn}`);

  const displayController = DisplayController(board);

  displayController.createBoard();

  while (!gameOver) {
    console.log(`Current board: 
    ${board[0]} | ${board[1]} | ${board[2]}
    ${board[3]} | ${board[4]} | ${board[5]}
    ${board[6]} | ${board[7]} | ${board[8]}`);

    isGameOn(board);

    let position =
      player1.piece == currentTurn
        ? getNewPositionFromPlayer(player1.piece)
        : getNewPositionFromPlayer(player2.piece);

    currentTurn == player1.piece
      ? playTurn(position, player1.piece)
      : playTurn(position, player2.piece);
  }

  function getNewPositionFromPlayer(piece) {
    return (
      prompt(
        `Where would you like to place your ${piece} next? Input a number between 1-9`
      ) - 1
    );
  }

  function isGameOn(board) {
    const testBoard = [...board];

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

    winningPositions.map((positions) => {
      console.log(`Testing ${testBoard} against ${positions}`);

      if (
        !gameOver &&
        testBoard[positions[0]] != null &&
        testBoard[positions[0]] == testBoard[positions[1]] &&
        testBoard[positions[1]] == testBoard[positions[2]]
      ) {
        gameOver = true;
        winner =
          testBoard[positions[0]] == player1.piece
            ? player1.piece
            : player2.piece;
        return;
      } else if (!testBoard.includes(null)) {
        gameOver = true;
        winner = "Tie";
      }
    });

    if (gameOver) {
      console.log(`Game over. Winner: ${winner}`);
      return false;
    } else {
      return true;
    }
  }

  function DisplayController(board) {
    return {
      createBoard: function () {
        console.log("Creating board container");
        let container = document.getElementById("app");
        console.log("Container: " + container);

        for (let i = 0; i < 9; i++) {
          let square = document.createElement("div");
          square.className = i.toString();
          square.innerText = i;
          container.appendChild(square);
        }
      },
    };
  }

  function playTurn(position, piece) {
    if (board[position]) {
      console.log(`spot ${position} taken, can't play`);
    } else {
      board[position] = piece;
      currentTurn =
        currentTurn == player1.piece ? player2.piece : player1.piece;
      console.log(`played ${piece} at ${position}`);
    }
  }
})();

function Player(piece) {
  return {
    piece,
  };
}
