import {
  copyObject,
  createArray,
  createMatrix,
  createRange,
  getRandomInt,
  shuffleArray,
} from "./utils";

describe("utils", () => {
  it("createArray", () => {
    const newArray = createArray(5, 1);
    expect(newArray.length).toEqual(5);
    expect(newArray).toEqual([1, 1, 1, 1, 1]);
  });

  it("createMatrix", () => {
    const newMatrix = createMatrix(3, 2, 6);
    expect(newMatrix).toEqual([
      [6, 6, 6],
      [6, 6, 6],
    ]);
  });
  it("copyObject", () => {
    const matrix = createMatrix(3, 2, 6);
    const newMatrix = copyObject(matrix);

    expect(newMatrix).toEqual(matrix);
    expect(newMatrix).toEqual([
      [6, 6, 6],
      [6, 6, 6],
    ]);
    matrix[0][0] = 7;
    expect(newMatrix).toEqual([
      [6, 6, 6],
      [6, 6, 6],
    ]);
    expect(newMatrix).not.toEqual(matrix);
  });

  it("getRandomInt", () => {
    const number1 = getRandomInt(3, 5);
    const number2 = getRandomInt(7, 12);
    const number3 = getRandomInt(15, 20);
    expect(number1).toBeGreaterThanOrEqual(3);
    expect(number1).toBeLessThanOrEqual(5);

    expect(number2).toBeGreaterThanOrEqual(7);
    expect(number2).toBeLessThanOrEqual(12);

    expect(number3).toBeGreaterThanOrEqual(15);
    expect(number3).toBeLessThanOrEqual(20);
  });

  it("shuffleArray", () => {
    const array = [1, 2, 3, 4, 5, 6, 7];
    const newArray = shuffleArray(array);

    expect(newArray.length).toEqual(array.length);
    array.forEach((element) => {
      expect(newArray.includes(element)).toBe(true);
    });
  });

  it("createRange", () => {
    const range = [3, 4, 5, 6];
    const newRange = createRange(3, 6);
    expect(newRange).toEqual(range);
  });
});
