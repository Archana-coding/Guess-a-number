const readline = require('readline');

// Initialize the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Game Global Variables
const minimumNumber = 1;
const maximumNumber = 10;
const randomNumber = Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) + minimumNumber;
let numberOfGuesses = 0;
const maxAttempts = 3;
let userName = '';

// Game Logic
function startGame() {
    if (numberOfGuesses >= maxAttempts) {
        console.log(`Sorry, ${userName}! You've used all ${maxAttempts} attempts. The correct number was ${randomNumber}.`);
        rl.close();
        return;
    }

    rl.question(`Guess a number between ${minimumNumber} and ${maximumNumber} (Attempt ${numberOfGuesses + 1} of ${maxAttempts}): `, (input) => {
        const guess = parseInt(input);

        // Check for valid input
        if (isNaN(guess) || guess < minimumNumber || guess > maximumNumber) {
            console.log(`Please enter a valid number between ${minimumNumber} and ${maximumNumber}.`);
            startGame(); 
            return;
        }

        // Update the guess counter by 1
        numberOfGuesses++;

        // Compare the users's guess
        if (guess < randomNumber) {
            console.log(`Too low, ${userName}! Try again.`);
            startGame(); 
        } else if (guess > randomNumber) {
            console.log(`Too high, ${userName}! Try again.`);
            startGame(); 
        } else {
            console.log(`Congratulations, ${userName}! You guessed the correct number ${randomNumber} in ${numberOfGuesses} attempts.`);
            rl.close(); 
        }
    });
}

// Start the game by prompting user to enter his name
rl.question('Enter your name: ', (name) => {
    userName = name.trim();
    console.log(`Hello, ${userName}! Welcome to the Guess a Number Game.`);
    startGame(); // call the game function
});