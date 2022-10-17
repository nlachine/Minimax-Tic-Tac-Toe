//Noah Lachine
//noahlachine.ca

BestOption = () => {
  //Reset bestScore and bestMove for this turn
  let bestScore = -Infinity;
  let bestMove; 

  //Initiate minimax evaluation
  for (let i = 0; i < board.length; i++) {
    if (ValidateMove(i)) {
      board[i] = aiPLayer;
      let score = minimax(board, 0, -Infinity, Infinity, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  //Make the best move
  PlaceMove(bestMove);
};

let scores = {
  X: 1,
  O: -1,
  tie: 0,
};

minimax = (newBoard, depth, alpha, beta, maximizing) => {
  let result = CheckWin();

  //Return score at this depth
  if (result !== null) {
    return scores[result];
  }
  //Continue evaluation until game ends. Maximizing finds best move for AI, otherwise play best move for human.
  if (maximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (ValidateMove(i)) {
        newBoard[i] = aiPLayer;
        let score = minimax(newBoard, depth + 1, alpha, beta, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);

        //alpha pruning
        alpha = Math.max(alpha, score)
        if (beta <= alpha)
          break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (ValidateMove(i)) {
        newBoard[i] = huPlayer;
        let score = minimax(newBoard, depth + 1, alpha, beta, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);

        //beta pruning
        beta = Math.min(beta, score)
        if (beta <= alpha)
          break;
      }
    }
    return bestScore;
  }
};
