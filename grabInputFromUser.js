const readline = require('readline');

// Interface for input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput() {
    return new Promise(resolve => {
      rl.question('\n>: ', answer => {
        resolve(answer);
      });
    });
}

const userInput = await getUserInput();
