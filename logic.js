// let defaultBoard = ["", "", "", "", "", "", "", "", ""];
const huPlayer = "O";
const aiPLayer = "X";
let currentPlayer = "O";
let gameOver = false;
let winner = "";
let placedPeices = 0;

// Define Win Combinations by Array Index
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

//Check if spot is available
const CheckMove = (id, value) => {
  //Check if there is no value in the cell
  if (value === "" && !gameOver) {
    placedPeices += 1;
    //Place the peice
    cells[id].innerHTML = currentPlayer;

    //Check to see if this was the winning move
    if (winner === "") CheckWin();

    //Change Turn
    currentPlayer = currentPlayer === huPlayer ? aiPLayer : huPlayer;
  }
};

const CheckWin = () => {
  winCombos.forEach((combo) => {
    if (
      (cells[combo[0]].innerHTML === "O" ||
        cells[combo[0]].innerHTML === "X") &&
      cells[combo[0]].innerHTML === cells[combo[1]].innerHTML &&
      cells[combo[1]].innerHTML === cells[combo[2]].innerHTML
    ) {
      gameOver = true;
      winner = cells[combo[0]].innerHTML;
      winText.innerHTML = `The Winner is ${winner}`;
    } else if (placedPeices === 9) {
      winText.innerHTML = `Tie Game!`;
    }   
  });
};

//Setup New Game
const Setup = () => {
  cells.forEach((cell) =>
    cell.addEventListener("click", () => CheckMove(cell.id, cell.innerHTML))
  );
  currentPlayer = "O";
};

const StartGame = () => {
  Setup();
};

//Start Game
StartGame();
