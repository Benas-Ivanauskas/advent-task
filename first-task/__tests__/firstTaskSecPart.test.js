const {
  mergedElementsSum,
  findElements,
  replaceSubstring,
  searchingSubstring,
  processGame,
  processFile,
} = require("../firstTaskSecPart");

describe("Testing mergedElementSum function", () => {
  test("merging first/last elements and calculating merged values sum", () => {
    let firstElementArr = [1, 2];
    let lastElementArr = [2, 1];
    let totalSum = 0;
    expect(mergedElementsSum(firstElementArr, lastElementArr, totalSum)).toBe(
      33
    );
  });

  test("passing first and last elements empty arrays", () => {
    let firstElementArr = [];
    let lastElementArr = [];
    let totalSum = 0;
    expect(mergedElementsSum(firstElementArr, lastElementArr, totalSum)).toBe(
      0
    );
  });
});

describe("Testing findElements function", () => {
  test("Finding first element in normal array", () => {
    let stringArray = ["glmsckj2bvmts1spctnjrtqhmbxzq"];
    let isFirst = true;
    expect(findElements(stringArray, isFirst)).toEqual(["2"]);
  });

  test("Finding first element in reversed array", () => {
    let stringArray = ["fivethreeonezblqnsfk1"];
    let isFirst = false;
    expect(findElements(stringArray, isFirst)).toEqual(["1"]);
  });

  test("Finding first element in normal array when its empty", () => {
    let stringArray = [];
    let isFirst = false;
    expect(findElements(stringArray, isFirst)).toEqual([]);
  });
});

describe("Testing replaceSubstring function", () => {
  test("replacing in reversed array first substring to number", () => {
    let string = "fivethree1zblqnsfk1";
    let isReverse = true;
    expect(replaceSubstring(string, isReverse)).toBe("five31zblqnsfk1");
  });

  test("replacing in normal array first substring to number", () => {
    let string = "fivethree1zblqnsfk1one";
    let isReverse = false;
    expect(replaceSubstring(string, isReverse)).toBe("5three1zblqnsfk1one");
  });
});

describe("Testing searchingSubstring function", () => {
  test("returning normal array string with replaces substring to number", () => {
    let gameString = ["asdonetwo1"];
    let isReverse = false;
    expect(searchingSubstring(gameString, replaceSubstring, isReverse)).toEqual(
      ["asd1two1"]
    );
  });

  test("returning normal array string with replaces substring to number", () => {
    let gameString = ["asdonetwo1"];
    let isReverse = true;
    expect(searchingSubstring(gameString, replaceSubstring, isReverse)).toEqual(
      ["asdone21"]
    );
  });
});

describe("Testing processGame function", () => {
  test("calculating all game totalSum", () => {
    let gameString = "asdone1";
    expect(processGame(gameString)).toBe(11);
  });
});

describe("Testing processFile async function", () => {
  test("passing argument filePath and checking total returned sum", async () => {
    let filePath = "input.txt";
    let result = await processFile(filePath);
    expect(result).toBe(55652);
  });
});
