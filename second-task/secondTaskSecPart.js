const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, input) => {
  if (err) throw err;
  let gamesArr = input.split("\n");

  let power;
  let powerSum = 0;

  for (let x = 0; x < gamesArr.length; x++) {
    let gameString = gamesArr[x];

    //secondPartArray Game 1: [...current seprate games]
    let secondPartArray = gameString.split(":")[1].trim();
    let currentGames = secondPartArray.trim().split("; ");

    //object to store red, green, blue values
    let currentGame = { red: 0, green: 0, blue: 0 };

    //spliting seprate games and checking colors quantity
    for (let i = 0; i < currentGames.length; i++) {
      game = currentGames[i].trim().split(", ");

      for (let z = 0; z < game.length; z++) {
        let [quantityStr, colorStr] = game[z].trim().split(" ");
        let quantity = parseInt(quantityStr, 10);

        if (quantity > currentGame[colorStr]) {
          currentGame[colorStr] = quantity;
        }

        let maxQuantities = {
          red: Math.max(currentGame.red, 0),
          green: Math.max(currentGame.green, 0),
          blue: Math.max(currentGame.blue, 0),
        };

        power = maxQuantities.red * maxQuantities.blue * maxQuantities.green;
      }
    }

    console.log("power sum", (powerSum += power));
  }
});
