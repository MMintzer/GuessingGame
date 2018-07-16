function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1
}

function shuffle(arr) {
  let m = arr.length

  while (m) {
    let i = Math.floor(Math.random() * m--);

    let t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

function Game() {
  this.pastGuesses = [];
  this.playersGuess = null;
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return (Math.abs(this.playersGuess - this.winningNumber));
}

Game.prototype.isLower = function() {
  if (this.playersGuess < this.winningNumber) {
    return true;
  } else {
    return false;
  }
}

Game.prototype.playersGuessSubmission = function(guess) {
  if (guess < 1 || guess > 100 || typeof guess !== 'number') {
    throw `That is an invalid guess.`
  } else {
    this.playersGuess = guess;
  }

  return this.checkGuess(guess);
}

Game.prototype.checkGuess = function(guess) {
  if (guess === this.winningNumber) {
    return `You Win!`;
  }
  if (this.pastGuesses.includes(guess)) {
    return 'You have already guessed that number.';
  }

  this.pastGuesses.push(guess);
  if (this.pastGuesses.length === 5) {
    return "You Lose.";
  }
  let delta = this.difference();

  if (delta < 10) {
    return "You're burning up!";
  } else if (delta < 25) {
    return "You're lukewarm.";
  } else if (delta < 50) {
    return "You're a bit chilly.";
  } else if (delta < 100) {
    return "You're ice cold!";
  }
}


Game.prototype.provideHint = function() {
  let hint = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  return shuffle(hint);
}

function newGame() {
  return new Game;
}


$(document).ready(function() {
  console.log('We ready, dog')
})
