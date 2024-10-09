const fs = require("fs");
const Readline = require("readline");

const rl = Readline.createInterface({
  input: fs.createReadStream("input.txt", { encoding: "utf-8" }),
});

console.time("start");
let input = [];

const symbols = [
  "?",
  "*",
  "=",
  "@",
  "#",
  "%",
  "$",
  "&",
  "+",
  "/",
  "-",
  "!",
  "~",
  "<",
  ">",
  "^",
];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  let results = [];

  let rowLength = input.length;

  for (let row = 0; row < rowLength; row++) {
    let colLength = input[row].length;

    for (let col = 0; col < colLength; col++) {
      let currentCell = input[row][col];

      if (symbols.includes(currentCell)) {
        directions.forEach((direct) => {
          const newRow = row + direct[0];
          const newCol = col + direct[1];

          if (isInBoard(newRow, newCol, rowLength, colLength)) {
            let adjCell = input[newRow][newCol];

            if (!isNaN(adjCell) && adjCell !== ".") {
              let foundNumbers = adjCell;
              let leftCol = newCol - 1;
              let rightCol = newCol + 1;

              // Check left
              for (
                let i = leftCol;
                isInBoard(newRow, i, rowLength, colLength) &&
                !isNaN(input[newRow][i]) &&
                input[newRow][i] !== ".";
                i--
              ) {
                foundNumbers = input[newRow][i] + foundNumbers;
                console.log("check left", foundNumbers);
              }

              // Check right
              for (
                let i = rightCol;
                isInBoard(newRow, i, rowLength, colLength) &&
                !isNaN(input[newRow][i]) &&
                input[newRow][i] !== ".";
                i++
              ) {
                foundNumbers += input[newRow][i];
                console.log("check right", foundNumbers);
              }

              results.push(foundNumbers);
            }
          }
        });
      }
    }
  }

  console.log(results);
  console.timeEnd("start");
});

function isInBoard(row, col, rowLength, colLength) {
  return row >= 0 && row < rowLength && col >= 0 && col < colLength;
}
