const fs = require("fs");
const readline = require("readline");

async function main() {
  try {
    const result = await processInputFile("lottery.txt");
    console.log("Total points sum:", result);
  } catch (err) {
    console.error("An error occured:", err);
  } finally {
  }
}

async function processInputFile(filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({ input: fileStream });

  let totalPoints = 0;

  for await (const line of rl) {
    totalPoints += processGame(line);
  }
  return totalPoints;
}

function processGame(gameString) {
  let finalResults = [];
  let input = [];
  input.push(gameString);

  for (let i = 0; i < input.length; i++) {
    let splitInput = input[i].split(":");

    let luckyNumbers = splitInput[1].split("|")[0].trim().split(" ");

    let gameNumWithSpaces = splitInput[1].split("|")[1].split(" ");

    let gameNumbers = filterNumbers(gameNumWithSpaces);
    let matchedLuckyNumbers = foundLuckyNumbers(luckyNumbers, gameNumbers);
    let points = calculatePoints(matchedLuckyNumbers);

    finalResults.push(points);
  }

  return finalResults.reduce((acc, num) => acc + num, 0);
}

function filterNumbers(gameNumWithSpaces) {
  let gameNumbers = gameNumWithSpaces
    .map((num) => num.trim())
    .filter((num) => num !== "");
  return gameNumbers;
}

function foundLuckyNumbers(luckyNumbers, gameNumbers) {
  let matchedLuckyNumbers = [];
  for (let j = 0; j < luckyNumbers.length; j++) {
    let currentLuckyNum = luckyNumbers[j].trim();

    if (gameNumbers.includes(currentLuckyNum)) {
      matchedLuckyNumbers.push(currentLuckyNum);
    }
  }
  return matchedLuckyNumbers;
}

function calculatePoints(luckyNums) {
  if (luckyNums.length === 0) return 0;
  let result = Math.pow(2, luckyNums.length - 1);
  return result;
}

main();

module.exports = { calculatePoints, foundLuckyNumbers, filterNumbers };

//----------------------OLD CODE---------------------------

// const fs = require("fs");
// const Readline = require("readline");

// const rl = Readline.createInterface({
//   input: fs.createReadStream("input.txt", { encoding: "utf-8" }),
// });

// const input = [];

// rl.on("line", (line) => {
//   input.push(line);
// });

// rl.on("close", () => {
//   let finalResults = [];

//   for (let i = 0; i < input.length; i++) {
//     let splitInput = input[i].split(":");

//     let luckyNumbers = splitInput[1].split("|")[0].trim().split(" ");

//     let gameNumWithSpaces = splitInput[1].split("|")[1].split(" ");

//     let gameNumbers = filterNumbers(gameNumWithSpaces);
//     let matchedLuckyNumbers = foundLuckyNumbers(luckyNumbers, gameNumbers);
//     let points = calculatePoints(matchedLuckyNumbers);

//     finalResults.push(points);
//   }
//   console.log(
//     "final result",
//     finalResults.reduce((acc, num) => acc + num, 0)
//   );
// });

// function filterNumbers(gameNumWithSpaces) {
//   let gameNumbers = gameNumWithSpaces
//     .map((num) => num.trim())
//     .filter((num) => num !== "");
//   return gameNumbers;
// }

// function foundLuckyNumbers(luckyNumbers, gameNumbers) {
//   let matchedLuckyNumbers = [];
//   for (let j = 0; j < luckyNumbers.length; j++) {
//     let currentLuckyNum = luckyNumbers[j].trim();

//     if (gameNumbers.includes(currentLuckyNum)) {
//       matchedLuckyNumbers.push(currentLuckyNum);
//     }
//   }
//   return matchedLuckyNumbers;
// }

// function calculatePoints(luckyNums) {
//   if (luckyNums.length === 0) return 0;
//   let result = Math.pow(2, luckyNums.length - 1);
//   return result;
// }
