const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, input) => {
  if (err) throw err;
  let gamesArr = input.split("\n");

  let totalSum = 0;

  for (let x = 0; x < gamesArr.length; x++) {
    let gameString = gamesArr[x];

    let allConditionsMet = true;

    //secondPartArray Game 1: [...current seprate games]
    let secondPartArray = gameString.split(":")[1].trim();
    let currentGames = secondPartArray.trim().split("; ");

    //GameId for counting id sum
    let gameId = gameString.split(":")[0].trim();
    let [_, id] = gameId.split(" ");

    //spliting seprate games and checking colors quantity
    for (let i = 0; i < currentGames.length; i++) {
      game = currentGames[i].trim().split(", ");

      for (let z = 0; z < game.length; z++) {
        let [quantityStr, colorStr] = game[z].trim().split(" ");
        let quantity = parseInt(quantityStr, 10);

        let gameObj = {
          color: colorStr,
          quantity,
        };

        if (gameObj.color === "blue" && gameObj.quantity <= 14) {
          continue;
        }
        if (gameObj.color === "red" && gameObj.quantity <= 12) {
          continue;
        }
        if (gameObj.color === "green" && gameObj.quantity <= 13) {
          continue;
        }

        allConditionsMet = false;
      }
    }

    if (allConditionsMet) {
      totalSum += Number(id);
      console.log(`game won:${id}`, totalSum);
    }
  }
});
