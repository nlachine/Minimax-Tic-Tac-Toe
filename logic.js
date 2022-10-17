//Noah Lachine
//noahlachine.ca

let board = ["", "", "", "", "", "", "", "", ""];
const huPlayer = "O";
const aiPLayer = "X";
let currentPlayer;
let gameOver = false;
let placedPeices = 0;

// Define Win Combinations by Array item
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Retrieve all game elements
const cells = document.querySelectorAll(".cell");
const winText = document.querySelector("#winText");
const playAgainBtn = document.querySelector("#reset");

NextTurn = () => {
  currentPlayer = currentPlayer === huPlayer ? aiPLayer : huPlayer;
  if (currentPlayer === aiPLayer) BestOption();
  //Else wait for human input.
};

//Check if spot is available and Place
MakeMove = (i) => {
  if (ValidateMove(i) && currentPlayer === huPlayer) PlaceMove(i);
};

//Validate that there is no piece there
ValidateMove = (i) => {
  return board[i] === "" && !gameOver ? true : false;
};

PlaceMove = (i) => {

  //Place the peiece
  cells[i].innerHTML = currentPlayer;
  board[i] = currentPlayer;

  //Check to see if this was the winning move
  EndGame();

  //Change Turn
  if (!gameOver) NextTurn();
};

//Check for a winner or tie game
CheckWin = () => {
  let winner = null;

  //Check for a winning combination
  winCombos.forEach((combo) => {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
    }
  });

  //Check if board is full
  let placedPeices = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] != "") placedPeices++;
  }

  //Return game result
  if (winner === null && placedPeices === 9) {
    return "tie";
  } else {
    return winner;
  }
};

EndGame = () => {
  let result = CheckWin();

  //Change display
  if (result !== null) {
    if (result === "tie") {
      winText.innerHTML = `Tie Game`;
    } else {
      winText.innerHTML = `The winner is ${result}`;
    }
    gameOver = true;
  }
};

//Reset Game
ResetGame = () => {
  gameOver = false;
  cells.forEach((cell) => (cell.innerHTML = ""));
  board = ["", "", "", "", "", "", "", "", ""];
  winText.innerHTML = "";
  placedPeices = 0;
  currentPlayer = huPlayer;
  // NextTurn()
};

//Start New Game
StartGame = () => {
  ResetGame();
  cells.forEach((cell) =>
    cell.addEventListener("click", () => MakeMove(cell.id))
  );
  playAgainBtn.addEventListener("click", ResetGame);
};

// Run Game
StartGame();
