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

// Game.prototype.checkGuess = function(guess) {
//   if (guess === this.winningNumber) {
//     return `You Win!`;
//   }
//   if (this.pastGuesses.includes(guess)) {
//     return 'You have already guessed that number.';
//   }

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
  $('#submit').click(function(e) {
    console.log('Submit button has been clicked')
  })
})

function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function() {
    let game = new Game();

    $('#submit').click(function(e) {
       makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })
})

Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) &gt; -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff &lt; 10) return'You\'re burning up!';
                else if(diff &lt; 25) return'You\'re lukewarm.';
                else if(diff &lt; 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}

$('#hint').click(function() {
    let hints = game.provideHint();
    $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
});

$('#reset').click(function() {
    game = newGame();
    $('#title').text('Play the Guessing Game!');
    $('#subtitle').text('Guess a number between 1-100!')
    $('.guess').text('-');
    $('#hint, #submit').prop("disabled",false);
})
