/**
 * Created by jalatraining on 10/8/2016.
 */

// one two three four five

var Hangman = function () {
    this.words = [];
};

Hangman.prototype.feedCollection = function() {
    var words = prompt('Please enter a collection of words for the game.');
    this.words = words.split(' ').filter(function (str) {
        return str.length > 3;
    });
};

Hangman.prototype.isWordCollectionFed = function() {
    return this.words.length > 0;
};

Hangman.prototype.play = function () {
    // pick a word randomly
    var index = Math.round(Math.random() * (this.words.length - 1));
    var word = this.words[index];

    var attempts = 3;
    var control = word.split('');
    var guessing = word.replace(/./g,'-').split('');

    var letter;
    var letterGuessed;
    var misses = 0;
    var guessed = false;
    console.log('Selected word:', word);

    while (misses < attempts) {
        console.log(guessing.join(' '));
        console.log('You have', attempts - misses, 'attempts more.');
        letter = prompt('Guess a letter.');

        letterGuessed = false;
        for (var i = 0; i < control.length; i++) {
            if (control[i] == letter) {
                guessing[i] = letter;
                letterGuessed = true;
            }
        }

        if (letterGuessed === false) {
            misses = misses + 1;
        }

        if (guessing.join('') == word) {
            guessed = true;
            break;
        }
    }

    if (guessed) {
        console.log('You won!!!');
    } else {
        console.log('Game over.');
    }
};

function playHangman () {
    var hangman = new Hangman();
    var option = 0;

    do {
        option = parseInt(prompt('Select an option:\n    1. Feed collection of WORDs\n    2. Play\n    3. Quit'));

        switch (option) {
            case 1:
                hangman.feedCollection();
                break;
            case 2:
                if (hangman.isWordCollectionFed()) {
                    hangman.play();
                } else {
                    alert('Word collection is empty. Please add some words.');
                }
                break;
            case 3:
                break;
        }
    } while (option != 3);
}

(playHangman)();