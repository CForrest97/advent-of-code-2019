import { List, Range } from "immutable";

const isSorted = (numbers: List<number>): boolean => {
  for (let index = 0; index < numbers.size - 1; index += 1) {
    if (numbers.get(index) > numbers.get(index + 1)) return false;
  }
  return true;
};

const containsAtLeastPair = (numbers: List<number>): boolean => numbers
  .countBy(n => n)
  .filter(v => v >= 2)
  .size > 0;

const containsPair = (numbers: List<number>): boolean => numbers
  .countBy(n => n)
  .filter(v => v === 2)
  .size > 0;

const splitNumber = (number: number): List<number> => List(number.toString().split(""))
  .map(n => parseInt(n, 10));

const getValidPasswords1 = (min: number, max: number): List<List<number>> => List(Range(min, max))
  .map(number => splitNumber(number))
  .filter(numbers => isSorted(numbers))
  .filter(numbers => containsAtLeastPair(numbers));

const getValidPasswords2 = (min: number, max: number): List<List<number>> => (
  getValidPasswords1(min, max).filter(numbers => containsPair(numbers))
);

export {
  getValidPasswords1,
  getValidPasswords2,
};
