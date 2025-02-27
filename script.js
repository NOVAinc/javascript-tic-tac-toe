(function Game() {
  /* Initialize empty board */
  console.log("Initializing match. Creating empty board");
  const board = new Array(9).fill(null);

  /* Create and select player pieces */
  const player1 = Player(prompt("Player 1, what is your piece?"));
  const player2 = Player(prompt("Player 2, what is your piece?"));

  let gameOver = false;
  let currentTurn = Math.random() < 0.5 ? player1.piece : player2.piece;

  console.log(`Player 1: ${player1.piece}`);
  console.log(`Player 2: ${player2.piece}`);
  console.log(`First player: ${currentTurn}`);

  while (!gameOver) {
    let coordinate;

    coordinate =
      player1.piece == currentTurn
        ? prompt(
            `Player 1, where would you like to place your ${player1.piece} next? Input a number between 1-9`
          )
        : prompt(
            `Player 2, where would you like to place your ${player2.piece} next? Input a number between 1-9`
          );

    currentTurn == player1.piece
      ? playTurn(coordinate, player1.piece)
      : playTurn(coordinate, player2.piece);
  }

  function playTurn(coordinate, piece) {
    if (board[coordinate]) {
      console.log(`spot ${coordinate} taken, can't play`);
    } else {
      board[coordinate] = piece;
      currentTurn =
        currentTurn == player1.piece ? player2.piece : player1.piece;
      console.log(`played ${piece} at ${coordinate}`);
    }
  }
})();

function Player(piece) {
  return {
    piece,
  };
}
