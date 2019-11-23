import { List, Set } from "immutable";
import { promises as fs } from "fs";

const calculateFrequency = (frequencies: List<number>): number => frequencies.reduce(
  (subtotal, x) => subtotal + x, 0,
);

const parser = async (filePath: string): Promise<List<number>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const frequencyStrings = List(contents.toString().split("\n"));
  return frequencyStrings.map(n => parseInt(n, 10));
};

const calculateFrequencyFoundTwice = (frequencies: List<number>): number => {
  let viewedFrequencies = Set<number>();
  let total: number = 0;
  let index: number = 0;

  while (true) {
    const frequency: number = frequencies.get(index % frequencies.count());
    total += frequency;
    if (viewedFrequencies.has(total)) return total;
    viewedFrequencies = viewedFrequencies.add(total);
    index += 1;
  }
};

export { calculateFrequency, parser, calculateFrequencyFoundTwice };
