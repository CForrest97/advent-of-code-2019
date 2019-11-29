import { List } from "immutable";
import { promises as fs } from "fs";

const reducePolymer = poly => {
  let polymer = poly;
  for (let index = 0; index < polymer.size - 1; index += 1) {
    const current = polymer.get(index);
    const next = polymer.get(index + 1);

    if (current.toUpperCase() === next.toUpperCase() && current !== next) {
      polymer = polymer.delete(index + 1);
      polymer = polymer.delete(index);
      index -= 2;
      index = index < -1 ? -1 : index;
    }
  }
  return polymer;
};

const calculateReductionLength = polymer => reducePolymer(polymer).count();

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  return List(contents.toString().split(""));
};

const calculateReductionLengthWithRemoval = polymer => {
  const reducedPolymer = reducePolymer(polymer);
  const alphabet = List("abcdefghijklmnopqrstuvwxyz".split(""));
  const scores = alphabet.map(char => calculateReductionLength(
    reducedPolymer.filterNot(c => c.toLowerCase() === char),
  ));
  return scores.sort().first();
};

export {
  calculateReductionLength,
  parser,
  calculateReductionLengthWithRemoval,
};
