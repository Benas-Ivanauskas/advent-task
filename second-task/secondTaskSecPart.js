const Readline = require('readline');
const fs = require("fs");

const rl = Readline.createInterface({
  input: fs.createReadStream('input.txt', { encoding: "utf-8" })
});

console.time('Starting')
let powerSum = 0;

rl.on('line', (line) => {
  let gamesArr = line.split("\n");
  
  for (let x = 0; x < gamesArr.length; x++) {
    let gameString = gamesArr[x];

    // Get the second part of the game
    let secondPartArray = gameString.split(":")[1]?.trim();

    let currentGames = secondPartArray.split("; ");
    let currentGame = { red: 0, green: 0, blue: 0 };
    
    for (let i = 0; i < currentGames.length; i++) {
      let game = currentGames[i].trim().split(", ");

      // Check colors quantity
      for (let z = 0; z < game.length; z++) {
        let [quantityStr, colorStr] = game[z].trim().split(" ");
        let quantity = parseInt(quantityStr, 10);

        if (quantity > currentGame[colorStr]) {
          currentGame[colorStr] = quantity;
        }
      }
    }

    // Calculate power for the current game
    let maxQuantities = {
      red: currentGame.red,
      green: currentGame.green,
      blue: currentGame.blue,
    };

    let power = maxQuantities.red * maxQuantities.blue * maxQuantities.green;
    powerSum += power;
  }
});

rl.on('close', () => {
  console.log("Total power sum:", powerSum);
  console.log('Finished reading');
  console.timeEnd('Starting')
});
