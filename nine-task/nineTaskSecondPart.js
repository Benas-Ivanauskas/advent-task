const fs = require("fs");
const rl = fs.createReadStream("input.txt", { encoding: "utf-8" });

rl.on("data", (data) => {
  console.time("Finished execution");
  const inputArr = data.split("\n");
  let totalSum = 0;

  for (let input of inputArr) {
    let currentArray = input.split(" ");
    const convertingStringToNumbersArr = currentArray.map((values) => +values);

    let nextValue = recursion(convertingStringToNumbersArr);
    totalSum += nextValue;
  }
  console.log("All input total sum", totalSum);
});

rl.on("end", () => {
  console.timeEnd("Finished execution");
});

function recursion(arr) {
  let resultArr = [];
  pushValuesToNewArray(arr, resultArr);

  if (resultArr.length === 1) {
    return resultArr[resultArr.length - 1];
  }

  let nextValue = recursion(resultArr);
  let lastOriginalValue = arr[0];

  return lastOriginalValue - nextValue;
}

function pushValuesToNewArray(arr, resultArr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let firstEl = arr[i];
    let secondEl = arr[i + 1];

    resultArr.push(secondEl - firstEl);
  }
  return resultArr;
}
