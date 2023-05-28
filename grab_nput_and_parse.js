// Prompt the user for input
const input = prompt("Enter a command:");

// Parse the input
const parsedInput = input.split(" ");
const command = parsedInput[0];
const arguments = parsedInput.slice(1);

// Execute the function based on the command
switch (command) {
  case "add":
    executeAddFunction(arguments);
    break;
  case "subtract":
    executeSubtractFunction(arguments);
    break;
  case "multiply":
    executeMultiplyFunction(arguments);
    break;
  case "divide":
    executeDivideFunction(arguments);
    break;
  default:
    console.log("Invalid command!");
    break;
}

// Example functions for each command
function executeAddFunction(args) {
  // Handle add command logic here
  console.log("Executing add function with arguments:", args);
}

function executeSubtractFunction(args) {
  // Handle subtract command logic here
  console.log("Executing subtract function with arguments:", args);
}

function executeMultiplyFunction(args) {
  // Handle multiply command logic here
  console.log("Executing multiply function with arguments:", args);
}

function executeDivideFunction(args) {
  // Handle divide command logic here
  console.log("Executing divide function with arguments:", args);
