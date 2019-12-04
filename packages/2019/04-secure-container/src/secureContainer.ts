import { List, Range } from "immutable";

const isSorted = (numbers: List<number>): boolean => numbers.equals(numbers.sort());

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

const getValidPasswords1 = (min: number, max: number): number => List(Range(min, max))
  .map(number => splitNumber(number))
  .filter(numbers => isSorted(numbers))
  .filter(numbers => containsAtLeastPair(numbers))
  .size;

const getValidPasswords2 = (min: number, max: number): number => List(Range(min, max))
  .map(number => splitNumber(number))
  .filter(numbers => isSorted(numbers))
  .filter(numbers => containsPair(numbers))
  .size;

export {
  getValidPasswords1,
  getValidPasswords2,
};
