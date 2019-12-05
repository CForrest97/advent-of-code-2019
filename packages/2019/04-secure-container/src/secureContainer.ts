import { List, Range } from "immutable";

const isSorted = (numbers: List<number>): boolean => numbers
  .zip(numbers.skip(1))
  .every(([a, b]) => a <= b);

const containsAtLeastPair = (numbers: List<number>): boolean => numbers
  .countBy(n => n)
  .some(v => v >= 2);

const containsPair = (numbers: List<number>): boolean => numbers
  .countBy(n => n)
  .contains(2);

const splitNumber = (number: number): List<number> => List(number.toString().split(""))
  .map(n => parseInt(n, 10));

const getValidPasswords1 = (min: number, max: number): List<List<number>> => List(Range(min, max))
  .map(number => splitNumber(number))
  .filter(numbers => containsAtLeastPair(numbers))
  .filter(numbers => isSorted(numbers));

const getValidPasswords2 = (min: number, max: number): List<List<number>> => (
  getValidPasswords1(min, max).filter(numbers => containsPair(numbers))
);

export {
  getValidPasswords1,
  getValidPasswords2,
};
