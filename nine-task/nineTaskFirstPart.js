const fs = require("fs");
const readline = require("readline");

async function main() {
  console.time("Execution time");
  try {
    const totalSum = await processInputFile("input.txt");
    console.log("Total sum:", totalSum);
  } catch (err) {
    console.error("An error occurred:", err.message);
  } finally {
    console.timeEnd("Execution time");
  }
}

async function processInputFile(filePath) {
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({ input: fileStream });

  let totalSum = 0;

  for await (const line of rl) {
    totalSum += processGame(line);
  }

  return totalSum;
}

function processGame(gameString) {
  const inputArr = gameString.split("\n");
  let totalSum = 0;

  for (let input of inputArr) {
    if (input.trim()) {
      let currentArray = input.split(" ").map(Number);
      let nextValue = recursion(currentArray);
      totalSum += nextValue;
    }
  }
  return totalSum;
}

function recursion(arr) {
  const resultArr = pushValuesToNewArray(arr);

  if (resultArr.length === 1) {
    return resultArr[0];
  }
  console.log(resultArr);

  let nextValue = recursion(resultArr);
  let lastOriginalValue = arr[arr.length - 1];

  return lastOriginalValue + nextValue;
}

function pushValuesToNewArray(arr, resultArr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let firstEl = arr[i];
    let secondEl = arr[i + 1];
    resultArr.push(secondEl - firstEl);
  }
  return resultArr;
}

function pushValuesToNewArray(arr) {
  const resultArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let firstEl = arr[i];
    let secondEl = arr[i + 1];
    resultArr.push(secondEl - firstEl);
  }
  return resultArr;
}

main();

//------------old code---------------

// const rl = fs.createReadStream("input.txt", { encoding: "utf-8" });

// rl.on("data", (data) => {
//   console.time("Finished execution");
//   const inputArr = data.split("\n");
//   let totalSum = 0;

//   for (let input of inputArr) {
//     let currentArray = input.split(" ");
//     const convertingStringToNumbersArr = currentArray.map((values) => +values);

//     let nextValue = recursion(convertingStringToNumbersArr);
//     totalSum += nextValue;
//   }
//   console.log("All input total sum", totalSum);
// });

// rl.on("end", () => {
//   console.timeEnd("Finished execution");
// });

// function recursion(arr) {
//   let resultArr = [];
//   pushValuesToNewArray(arr, resultArr);

//   if (resultArr.length === 1) {
//     return resultArr[resultArr.length - 1];
//   }

//   let nextValue = recursion(resultArr);
//   let lastOriginalValue = arr[arr.length - 1];

//   return lastOriginalValue + nextValue;
// }

// function pushValuesToNewArray(arr, resultArr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     let firstEl = arr[i];
//     let secondEl = arr[i + 1];

//     resultArr.push(secondEl - firstEl);
//   }
//   return resultArr;
// }
