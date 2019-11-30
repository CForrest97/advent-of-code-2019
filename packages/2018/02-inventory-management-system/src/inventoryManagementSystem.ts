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
  const pairs = duplicates.filter(duplicate => duplicate.get("pair")).size;
  const triplets = duplicates.filter(duplicate => duplicate.get("triplet")).size;
  return pairs * triplets;
};

const parser = async (filePath: string): Promise<List<List<string>>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const frequencyStrings = List(contents.toString().split("\n"));
  return frequencyStrings.map(s => List(s.split("")));
};

const countDifference = (a: List<string>, b: List<string>): number => a.zip(b)
  .filter(([c1, c2]) => c1 !== c2)
  .size;

const findSimilarIds = (ids: List<List<string>>): List<List<string>> => {
  const pairs = ids.flatMap(id1 => ids.map(id2 => List.of(id1, id2)));
  return pairs.find(([id1, id2]) => countDifference(id1, id2) === 1);
};

const findCommonCharacters = (ids: List<List<string>>): string => {
  const [id1, id2] = findSimilarIds(ids);
  return id1.zip(id2).filter(([c1, c2]) => c1 === c2).map(arr => arr[0]).join("");
};

export {
  countDuplicates,
  calculateChecksum,
  parser,
  findCommonCharacters,
};
