const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  console.time("Execution Time");
  let input = data.split("\n");

  let reversedArr = [...input];
  let forwardArr = [...input];
  let firstElementsArr = [];
  let lastElementsArr = [];

  const numberWords = [
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

  for (let x = 0; x < reversedArr.length; x++) {
    let currentString = reversedArr[x];
    let found = false;

    // Reversed searching substring
    for (let i = currentString.length - 1; i >= 0; i--) {
      if (found) break;

      for (let word of numberWords) {
        let revSubstring = currentString.substring(i - word.length + 1, i + 1);
        if (revSubstring === word) {
          // Replace the found substring with a number
          currentString =
            currentString.substring(0, i - word.length + 1) +
            (numberWords.indexOf(word) + 1) +
            currentString.substring(i + 1);
          found = true;
          break;
        }
      }
    }
    // Updating inputArr with replaced number
    reversedArr[x] = currentString;
  }

  let lastEl;
  //Searching last element number in string
  for (let i = 0; i < reversedArr.length; i++) {
    let currString = reversedArr[i];
    for (let z = currString.length - 1; z >= 0; z--) {
      if (parseInt(currString[z], 10)) {
        lastEl = currString[z];
        lastElementsArr.push(lastEl);
        break;
      }
    }
  }

  //----------------------------Forward array--------------------------------//

  for (let x = 0; x < forwardArr.length; x++) {
    let currentString = forwardArr[x];
    let found = false;

    for (let i = 0; i < currentString.length; i++) {
      if (found) break;

      for (let word of numberWords) {
        let forwSubstring = currentString.substring(i, i + word.length);
        if (forwSubstring === word) {
          // Replace the found substring with a number
          currentString = currentString.replace(
            forwSubstring,
            numberWords.indexOf(word) + 1
          );
          found = true;
          break;
        }
      }
    }
    // Updating forwardArr with replaced number
    forwardArr[x] = currentString;
  }

  let firstEl;
  //Searching forward first element number in string
  for (let i = 0; i < forwardArr.length; i++) {
    let currString = forwardArr[i];
    for (let z = 0; z < currString.length; z++) {
      if (parseInt(currString[z], 10)) {
        firstEl = currString[z];
        firstElementsArr.push(firstEl);
        break;
      }
    }
  }

  let sum = 0;

  for (let i = 0; i < firstElementsArr.length; i++) {
    const firstEl = firstElementsArr[i];
    const lastEl = lastElementsArr[i];
    const mergedNumbers = Number(`${firstEl}${lastEl}`);

    sum += mergedNumbers;
  }

  console.log(sum);
  console.timeEnd("Execution Time");
});

//readline, readStream.. chunks... read line by line code
