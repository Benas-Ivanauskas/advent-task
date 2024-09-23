const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt', { encoding: 'utf-8' })
});

console.time('Starting')
let totalSum = 0;

rl.on('line', (line) => {
  let input = line.split("\n");
  let reversedArr = [...input];
  let forwardArr = [...input];
  let firstElementsArr = [];
  let lastElementsArr = [];

  const numberWords = [
    "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine"
  ];

  for (let x = 0; x < reversedArr.length; x++) {
    let currentString = reversedArr[x];
    let found = false;

    // Reversed searching substring
    for (let i = currentString.length - 1; i >= 0; i--) {
      if (found) break;

      for (let word of numberWords) {
        let revSubstring = currentString.substring(i - word.length + 1, i + 1);
        if (revSubstring === word) {
          currentString =
            currentString.substring(0, i - word.length + 1) +
            (numberWords.indexOf(word) + 1) +
            currentString.substring(i + 1);
          found = true;
          break;
        }
      }
    }
    reversedArr[x] = currentString;
  }

  // Searching last element number in string
  for (let i = 0; i < reversedArr.length; i++) {
    let currString = reversedArr[i];
    for (let z = currString.length - 1; z >= 0; z--) {
      if (parseInt(currString[z], 10)) {
        lastElementsArr.push(currString[z]);
        break;
      }
    }
  }

  // Process forwardArr to replace words with numbers
  for (let x = 0; x < forwardArr.length; x++) {
    let currentString = forwardArr[x];
    let found = false;

    for (let i = 0; i < currentString.length; i++) {
      if (found) break;

      for (let word of numberWords) {
        let forwSubstring = currentString.substring(i, i + word.length);
        if (forwSubstring === word) {
          currentString = currentString.replace(
            forwSubstring,
            numberWords.indexOf(word) + 1
          );
          found = true;
          break;
        }
      }
    }
    forwardArr[x] = currentString;
  }

  // Searching forward first element number in string
  for (let i = 0; i < forwardArr.length; i++) {
    let currString = forwardArr[i];
    for (let z = 0; z < currString.length; z++) {
      if (parseInt(currString[z], 10)) {
        firstElementsArr.push(currString[z]);
        break;
      }
    }
  }

  // Calculate the sum of merged first and last elements
  for (let i = 0; i < firstElementsArr.length; i++) {
    const firstEl = firstElementsArr[i];
    const lastEl = lastElementsArr[i];
    const mergedNumbers = Number(`${firstEl}${lastEl}`);

    totalSum += mergedNumbers;
  }
});

rl.on('close', () => {
  console.log(totalSum);
  console.timeEnd('Starting')
});
