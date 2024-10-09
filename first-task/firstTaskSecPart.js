const fs = require("fs");
const readline = require("readline");

const NUMBERWORDS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

async function main() {
  try {
    const result = await processFile("input.txt");
    console.log("Total sum result:", result);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

function processGame(gameString) {
  let totalSum = 0;

  let stringsArray = searchingSubstring([gameString], replaceSubstring, false);
  let reversedArr = searchingSubstring([gameString], replaceSubstring, true);

  let firstElementsArr = findElements(stringsArray, true);
  let lastElementsArr = findElements(reversedArr, false);

  totalSum = mergedElementsSum(firstElementsArr, lastElementsArr, totalSum);
  return totalSum;
}

function searchingSubstring(arr, replaceFunction, isReverse) {
  for (let x = 0; x < arr.length; x++) {
    let currentString = arr[x];
    arr[x] = replaceFunction(currentString, isReverse);
  }
  return arr;
}

function replaceSubstring(string, isReverse) {
  let found = false;

  if (isReverse) {
    for (let i = string.length - 1; i >= 0; i--) {
      if (found) break;
      for (let word of NUMBERWORDS) {
        let wordLength = word.length;
        let revSubstring = string.substring(i - wordLength + 1, i + 1);
        if (revSubstring === word) {
          string =
            string.substring(0, i - wordLength + 1) +
            (NUMBERWORDS.indexOf(word) + 1) +
            string.substring(i + 1);
          found = true;
          break;
        }
      }
    }
  } else {
    for (let i = 0; i < string.length; i++) {
      if (found) break;
      for (let word of NUMBERWORDS) {
        let forwSubstring = string.substring(i, i + word.length);
        if (forwSubstring === word) {
          string = string.replace(forwSubstring, NUMBERWORDS.indexOf(word) + 1);
          found = true;
          break;
        }
      }
    }
  }
  return string;
}

function findElements(arr, isFirst) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let currString = arr[i];
    if (isFirst) {
      for (let z = 0; z < currString.length; z++) {
        if (parseInt(currString[z], 10)) {
          result.push(currString[z]);
          break;
        }
      }
    } else {
      for (let z = currString.length - 1; z >= 0; z--) {
        if (parseInt(currString[z], 10)) {
          result.push(currString[z]);
          break;
        }
      }
    }
  }
  return result;
}

function mergedElementsSum(firstElementsArr, lastElementsArr, totalSum) {
  for (let i = 0; i < firstElementsArr.length; i++) {
    const firstEl = firstElementsArr[i];
    const lastEl = lastElementsArr[i];
    const mergedNumbers = Number(`${firstEl}${lastEl}`);
    totalSum += mergedNumbers;
  }
  return totalSum;
}

async function processFile(filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({ input: fileStream });

  let totalSum = 0;

  for await (const line of rl) {
    totalSum += processGame(line.trim());
  }

  return totalSum;
}

main();

module.exports = {
  mergedElementsSum,
  findElements,
  replaceSubstring,
  searchingSubstring,
  processGame,
  processFile,
};
