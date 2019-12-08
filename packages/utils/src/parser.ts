import { List } from "immutable";
import { promises as fs } from "fs";

const lineReader = async (filePath: string): Promise<List<string>> => {
  const buffer: Buffer = await fs.readFile(filePath);
  return List(buffer.toString().split("\n"));
};

const decimalReader = async (filePath: string): Promise<List<number>> => {
  const buffer: Buffer = await fs.readFile(filePath);
  return List(buffer.toString().split(",")).map(n => parseInt(n, 10));
};

export {
  lineReader,
  decimalReader,
};
