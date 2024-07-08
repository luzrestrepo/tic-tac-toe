let currentPlayer = 1;
let symbols = ["🐶", "🐱"];
let placedSymbols = 0;
let gameEnded = false;
let victoryMessage = document.getElementById("victory");
let buttons = Array.from(document.getElementsByTagName("button"));

buttons.forEach((button) => button.addEventListener("click", placeSymbol));

function placeSymbol(event) {
  let clickedButton = event.target;
  if (!gameEnded && clickedButton.innerHTML == "") {
    clickedButton.innerHTML = symbols[currentPlayer];
    placedSymbols += 1;

    let gameState = checkGameState();
    if (gameState == 0) {
      switchPlayer();
      if (placedSymbols < 9) {
        aiMove();
        gameState = checkGameState();
        placedSymbols += 1;
        switchPlayer();
      }
    }
    if (gameState == 1) {
      victoryMessage.innerHTML = "You won! 😊";
      victoryMessage.style.visibility = "visible";
      gameEnded = true;
    } else if (gameState == -1) {
      victoryMessage.innerHTML = "You lost! 😢";
      victoryMessage.style.visibility = "visible";
      gameEnded = true;
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer == 1 ? 0 : 1;
}

function checkGameState() {
  let winningPosition = 0;
  let gameState = 0;

  function areEqual(...elements) {
    let values = elements.map((element) => element.innerHTML);
    if (values[0] != "" && values.every((value, _, arr) => value === arr[0])) {
      let color = currentPlayer === 1 ? "Fuchsia" : "Green";
      elements.forEach((element) => (element.style.backgroundColor = color));
      return true;
    } else {
      return false;
    }
  }

  if (areEqual(buttons[0], buttons[1], buttons[2])) {
    winningPosition = 1;
  } else if (areEqual(buttons[3], buttons[4], buttons[5])) {
    winningPosition = 2;
  } else if (areEqual(buttons[6], buttons[7], buttons[8])) {
    winningPosition = 3;
  } else if (areEqual(buttons[0], buttons[3], buttons[6])) {
    winningPosition = 4;
  } else if (areEqual(buttons[1], buttons[4], buttons[7])) {
    winningPosition = 5;
  } else if (areEqual(buttons[2], buttons[5], buttons[8])) {
    winningPosition = 6;
  } else if (areEqual(buttons[0], buttons[4], buttons[8])) {
    winningPosition = 7;
  } else if (areEqual(buttons[2], buttons[4], buttons[6])) {
    winningPosition = 8;
  }

  if (winningPosition > 0) {
    gameState = currentPlayer == 1 ? 1 : -1;
  }
  return gameState;
}

function aiMove() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let values = buttons.map((button) => button.innerHTML);
  let pos = -1;

  if (values[4] == "") {
    pos = 4;
  } else {
    let n = getRandomInt(0, buttons.length - 1);
    while (values[n] != "") {
      n = getRandomInt(0, buttons.length - 1);
    }
    pos = n;
  }
  buttons[pos].innerHTML = "🐶";
  return pos;
}
