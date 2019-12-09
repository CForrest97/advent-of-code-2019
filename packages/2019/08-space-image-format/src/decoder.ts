// eslint-disable-next-line no-unused-vars
import { List, Map } from "immutable";
import { promises as fs } from "fs";

const groupList = (list: List<any>, groupSize: number): List<List<any>> => list
  .map((_: any, index: number) => (index % groupSize === 0
    ? list.slice(index, index + groupSize)
    : undefined))
  .filter(item => item);

const parser = async (file: string, layerSize: number): Promise<List<List<number>>> => {
  const buffer: Buffer = await fs.readFile(file);
  const digits: List<number> = List(buffer.toString().split("")).map(n => parseInt(n, 10));
  return groupList(digits, layerSize);
};

const checksum = (layers: List<List<number>>): number => {
  const leastZerosLayer: Map<number, number> = layers
    .map((layer: List<number>) => layer.countBy(x => x))
    .minBy((layer: Map<number, number>) => layer.get(0));

  return leastZerosLayer.get(1) * leastZerosLayer.get(2);
};

const decode = (layers: List<List<number>>, rows: number, columns: number) => {
  let pixels = List();
  for (let pixelIndex = 0; pixelIndex < rows * columns; pixelIndex += 1) {
    pixels = pixels.push(layers.find(layer => layer.get(pixelIndex) !== 2).get(pixelIndex));
  }
  pixels = pixels.map(pixel => (pixel === 0 ? " " : "█"));
  return groupList(pixels, columns).map(row => row.join("")).join("\n");
};

export {
  parser,
  checksum,
  decode,
};
