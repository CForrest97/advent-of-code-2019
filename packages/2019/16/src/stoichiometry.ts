/* eslint-disable no-loop-func */
import { List } from "immutable";

const iterate = (digits: List<number>) => {
  const pattern = List.of(0, 1, 0, -1);
  let list = List();
  for (let i = 1; i <= digits.size; i += 1) {
    if (i > digits.size / 3) {
      list = list.push(Math.abs(
        digits.slice(i - 1, (2 * i) - 1).reduce((sub, x) => sub + (x % 10), 0),
      ) % 10);
    } else {
      const firstDigit = digits
        .map((digit, index) => digit * pattern.get((Math.floor((index + 1) / i)) % 4))
        .reduce((sub, x) => sub + (x % 10), 0);
      list = list.push(Math.abs(firstDigit % 10));
    }
  }
  return list;
};

const part1 = (number: string) => {
  let digits = List(number.split("")).map(n => parseInt(n, 10));
  for (let index = 0; index < 100; index += 1) {
    digits = iterate(digits);
  }
  return digits.take(8);
};

export default part1;
