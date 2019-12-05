import { List } from "immutable";
import { promises as fs } from "fs";

// const reducePolymer2 = poly => {
//   let polymer = poly;
//   for (let index = 0; index < polymer.size - 1; index += 1) {
//     const current = polymer.get(index);
//     const next = polymer.get(index + 1);

//     if (current.toUpperCase() === next.toUpperCase() && current !== next) {
//       polymer = polymer.splice(index, 2);
//       index = Math.max(-1, index - 2);
//     }
//   }
//   return polymer;
// };
const reducePolymer = (sequence: string) => [...sequence].reduce(
  (acc, curr) => ((
    acc
    && acc.charAt(acc.length - 1) !== curr
    && acc.charAt(acc.length - 1).toLowerCase() === curr.toLowerCase()
  ) ? acc.substr(0, acc.length - 1) : acc + curr),
);
// const reducePolymer3 = polymer => {
//   const result = [];
//   for (let index = 0; index < polymer.size - 1; index += 1) {
//     const current = polymer.get(index);
//     const next = polymer.get(index + 1);

//     if (current.toUpperCase() === next.toUpperCase() && current !== next) {
//       result.pop();
//       index = Math.max(-1, index - 2);
//     } else {
//       result.push(current);
//     }
//   }
//   return polymer;
// };

const calculateReductionLength = polymer => reducePolymer(polymer).length;

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  return (contents.toString());
};

const calculateReductionLengthWithRemoval = polymer => {
  const reducedPolymer = reducePolymer(polymer);
  const alphabet = List("abcdefghijklmnopqrstuvwxyz".split(""));
  const scores = alphabet.map(char => calculateReductionLength(
    reducedPolymer.replace(new RegExp(char, "gi"), ""),
  ));
  return scores.sort().first();
};

export {
  calculateReductionLength,
  parser,
  calculateReductionLengthWithRemoval,
};
