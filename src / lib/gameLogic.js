import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { gameState } from "./state.js";
import { setTimeout as delay } from "timers/promises";

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Shakespeare", "Hemingway", "Twain", "Austen"],
    answer: "Shakespeare",
  },
  {
   question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
];
const questionLimit = 3; // How many questions per round
const timeLimit = 10000; // 10 seconds per question (in ms)


// Main Menu
export async function showMainMenu() {
  const choice = await select({
    message: "Trivia Game Menu",
    choices: [
      { name: "Start Game", value: "start" },
      { name: "Show Stats", value: "stats" },
      { name: "Reset Game", value: "reset" },
      { name: "Quit", value: "quit" },
    ],
  });

  switch (choice) {
    case "start":
      await startGame(gameState);
      break;
    case "stats":
      showStats(gameState);
      break;
    case "reset":
      resetGame(gameState);
      console.log(chalk.yellow("Game stats reset!"));
      break;
    case "quit":
      console.log(chalk.blue("Thanks for playing!"));
      process.exit(0);
  }

  await showMainMenu(); // Go back to menu
}

export async function startGame(gameState) {
  console.log(`You’ll be asked ${questionLimit} questions.`);
  const selectedQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, questionLimit);

  for (const currentQuestion of selectedQuestions) {
    const result = await askWithTimer(currentQuestion, timeLimit);
    updateStats(result, gameState);

    if (result === "timeout") {
      console.log(chalk.red("Time’s up!"));
      console.log(chalk.blue(`Correct answer: ${currentQuestion.answer}`));
    } else if (result === "correct") {
      console.log(chalk.green("Correct!"));
    } else {
      console.log(chalk.red("Incorrect!"));
      console.log(chalk.blue(`Correct answer: ${currentQuestion.answer}`));
    }
  }
}

// Ask with timer
async function askWithTimer(questionObj, timeout) {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => {
    controller.abort(); // force cancel prompt
  }, timeout);

  try {
    const answer = await select({
      message: `${questionObj.question} (10 seconds)`,
      choices: questionObj.choices.map((c) => ({ name: c, value: c })),
      signal,
    });

    clearTimeout(timeoutId);
    return answer === questionObj.answer ? "correct" : "incorrect";
  } catch (err) {
    return "timeout";
  }
}

export function updateStats(result, gameState) {
  if (result === "correct") gameState.stats.correct += 1;
  else gameState.stats.incorrect += 1;
}

export function showStats(gameState) {
  console.log(chalk.blue("Game Statistics:"));
  console.log(chalk.green(`Correct: ${gameState.stats.correct}`));
  console.log(chalk.red(`Incorrect: ${gameState.stats.incorrect}`));

  const total = gameState.stats.correct + gameState.stats.incorrect;
  if (total > 0) {
    const percent = ((gameState.stats.correct / total) * 100).toFixed(1);
    console.log(chalk.blue(`Score: ${percent}%`));
  }
}

// Reset Game
export function resetGame(gameState) {
  gameState.stats = { correct: 0, incorrect: 0 };
}