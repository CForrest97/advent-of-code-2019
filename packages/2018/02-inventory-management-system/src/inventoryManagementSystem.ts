import { List, Map } from "immutable";
import { promises as fs } from "fs";

const countDuplicates = (id: List<string>) => {
  const groups = id.countBy(x => x);
  return Map({
    pair: groups.includes(2),
    triplet: groups.includes(3),
  });
};

const calculateChecksum = (ids: List<List<string>>): number => {
  const duplicates = ids.map(id => countDuplicates(id));
  let pairs = 0;
  let triplets = 0;
  duplicates.forEach(duplicate => {
    pairs += duplicate.get("pair") ? 1 : 0;
    triplets += duplicate.get("triplet") ? 1 : 0;
  });
  return pairs * triplets;
};

const parser = async (filePath: string): Promise<List<List<string>>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const frequencyStrings = List(contents.toString().split("\n"));
  return frequencyStrings.map(s => List(s.split("")));
};

const countDifference = (a: List<string>, b: List<string>): number => a.zip(b).map(
  ([c1, c2]) => (c1 !== c2 ? 1 : 0),
).reduce((total, x) => total + x, 0);

const findSimilarIds = (ids: List<List<string>>): List<List<string>> => {
  const pairs = ids.map(id1 => ids.map(id2 => List([id1, id2]))).flatten(1);
  return pairs.find(([id1, id2]) => countDifference(id1, id2) === 1);
};

const findCommonCharacters = (ids: List<List<string>>): string => {
  const [id1, id2] = findSimilarIds(ids);
  return id1.zip(id2).reduce((s, [c1, c2]) => s.concat(c1 === c2 ? c1 : ""), "");
};

export {
  countDuplicates,
  calculateChecksum,
  parser,
  findCommonCharacters,
};
