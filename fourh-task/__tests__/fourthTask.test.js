const {
  calculatePoints,
  foundLuckyNumbers,
  filterNumbers,
} = require("../fourthTask");

describe("Testing calculatePoints function", () => {
  test("checking returning result with empty array", () => {
    let luckyNums = [];
    expect(calculatePoints(luckyNums)).toBe(0);
  });

  test("checking returning result with valid array which are strings", () => {
    let luckyNums = ["1", "2", "3"];
    expect(calculatePoints(luckyNums)).toBe(4);
  });

  test("checking returning result with valid array which are numbers ", () => {
    let luckyNums = [1, 2, 3];
    expect(calculatePoints(luckyNums)).toBe(4);
  });

  test("checking result with mixed type array", () => {
    let luckyNums = [1, "2", 3];
    expect(calculatePoints(luckyNums)).toBe(4);
  });

  test("checking result with non-array input", () => {
    expect(calculatePoints(123)).toBeNaN();
    expect(calculatePoints({})).toBeNaN();
    expect(calculatePoints("test")).toBe(8); //idomus variantas, nes length tinka :D TypeScript padetu
  });

  test("checking result with nested array input", () => {
    let luckyNums = [
      [1, 2],
      [3, 4],
    ];
    expect(calculatePoints(luckyNums)).toBe(2);
  });
});

describe("Testing foundLuckyNumbers function", () => {
  test("checking if game numbers match lucky numbers", () => {
    let luckyNums = ["1", "2", "3"];
    let gameNums = ["5", "4", "1", "2", "3"];
    expect(foundLuckyNumbers(luckyNums, gameNums)).toEqual(["1", "2", "3"]);
  });

  test("checking if game numbers do not include lucky numbers", () => {
    let luckyNums = ["1", "2", "3"];
    let gameNums = ["5", "4", "6"];
    expect(foundLuckyNumbers(luckyNums, gameNums)).toEqual([]);
  });

  test("checking if lucky numbers trims empty spaces and exist in game numbers", () => {
    let luckyNums = ["1  ", "2 ", "3"];
    let gameNums = ["1", "4", "6"];
    expect(foundLuckyNumbers(luckyNums, gameNums)).toEqual(["1"]);
  });

  test("checking if mixed type values game numbers match lucky numbers", () => {
    let luckyNums = ["1  ", "2 ", "3"];
    let gameNums = [1, "4", 6];
    expect(foundLuckyNumbers(luckyNums, gameNums)).toEqual([]);
  });

  test("should throw TypeError when luckyNumbers and gameNumbers contains numbers", () => {
    let luckyNums = [1, 2, 3];
    let gameNums = [1, 2, 5, 6, 9];
    expect(() => foundLuckyNumbers(luckyNums, gameNums)).toThrow(TypeError);
  });

  test("should throw TypeError when luckyNumbers is not an array", () => {
    let luckyNums = null;
    let gameNums = [1, 2, 5, 6, 9];
    expect(() => foundLuckyNumbers(luckyNums, gameNums)).toThrow(TypeError);
  });

  test("checking if game numbers include lucky numbers when game numbers are different types", () => {
    let luckyNums = ["1", "2"];
    let gameNums = ["NaN", "1", 1, "86", "59"];
    expect(foundLuckyNumbers(luckyNums, gameNums)).toEqual(["1"]);
  });
});

describe("Testing filterNumbers function", () => {
  test("checking if filterNumbers correctly processes game numbers with empty spaces", () => {
    let gameNumsWithEmptySpaces = ["", "82", "14", "66", "57", "25"];
    expect(filterNumbers(gameNumsWithEmptySpaces)).toEqual([
      "82",
      "14",
      "66",
      "57",
      "25",
    ]);
  });

  test("checking if filterNumbers correctly processes game numbers with empty spaces and NaN value", () => {
    let gameNumsWithEmptySpaces = ["", "NaN", "71", "91", "86", "59"];
    expect(filterNumbers(gameNumsWithEmptySpaces)).toEqual([
      "NaN", //irgi idomesnis
      "71",
      "91",
      "86",
      "59",
    ]);
  });

  test("checking if filterNumbers  processes game numbers with empty array", () => {
    let gameNumsWithEmptySpaces = [];
    expect(filterNumbers(gameNumsWithEmptySpaces)).toEqual([]);
  });

  test("should throw ReferenceError when game numbers are a string", () => {
    let gameNumsWithEmptySpaces = "test";
    expect(() => filterNumbers(gameNumsWithEmptySpaces)).toThrow(TypeError);
  });
});
