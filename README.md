# trivia
Created a Command-Line Interface (CLI) trivia game using JavaScript. This project shows use of JavaScript concepts such as handling user input, managing program flow, working with arrays and objects, and building interactive terminal-based applications.

A simple command-line trivia game built with Node.js.
Each question has a 10-second time limit, if you don’t answer within the time, the game marks it as timed out.

## Features

- Multiple-choice trivia questions
- Timer that gives you 10 seconds per question
- Tracks correct and incorrect answers
- Shows stats on demand
- Reset game stats anytime
- Colorful feedback messages with Chalk

## Installation

1. Clone the repository:

git clone https://github.com/your-username/trivia.git,
cd trivia,
Install dependencies:
npm install

2. Start the game by running:

trivia

You will see the main menu with options:
Start Game — play a round of trivia (3 questions per round)
Show Stats — view your current correct/incorrect scores
Reset Game — clear all scores and start fresh
Quit — exit the game

## Gameplay
You have 10 seconds to answer each question.

If you answer correctly, you'll see a green "Correct!" message.

If you answer incorrectly or run out of time, the correct answer will be shown.

After each round, you can check your stats or play again.
