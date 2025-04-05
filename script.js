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
    return piece;
  }

  return {
    initPlayer,
    getName,
    getPiece,
  };
}

const gameManager = (() => {
  const board = (() => {
    const board = new Array(9).fill(null);

    function isPlaceFree() {
      // continue from here
    }

    return {};
  })();

  let player1 = Player();
  let player2 = Player();

  let currentPlayer;
  let winner = null;

  function startGame() {
    // refactor to use form fields
    player1.initPlayer("Lucas", "X");
    player2.initPlayer("Life", "O");

    // refactor to be random
    currentPlayer = player1;

    while (!isGameOver()) {
      let position = prompt(
        `Where would you like to make your move, ${currentPlayer.getName}?`
      );

      currentPlayer == player1
        ? attemptMove(player1, position)
        : attemptMove(player2, position);
    }
  }

  function isGameOver() {}

  function setWinner() {}

  function attemptMove() {}

  function getCurrentPlayer() {
    return currentPlayer == player1 ? player1 : player2;
  }

  function setCurrentPlayer() {}

  return {
    startGame,
    isGameOver,
    setWinner,
    attemptMove,
    getCurrentPlayer,
    setCurrentPlayer,
  };
})();

gameManager.startGame();
