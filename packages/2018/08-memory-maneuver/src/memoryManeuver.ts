import { List } from "immutable";
import { promises as fs } from "fs";

const sumMetadata = (tree: List<number>): [number, number] => {
  let score = 0;
  let index = 2;
  const [childNodes, metadataNodes] = tree.take(2);
  for (let _ = 0; _ < childNodes; _ += 1) {
    const childScoreAndLength = sumMetadata(tree.skip(index));
    score += childScoreAndLength[0];
    index += childScoreAndLength[1];
  }
  return [
    tree.skip(index).take(metadataNodes).reduce((subtotal, x) => subtotal + x, 0) + score,
    index + metadataNodes,
  ];
};

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  return List(contents.toString().split(" ")).map(s => parseInt(s, 10));
};

const sumMetadata2 = (tree: List<number>): [number, number] => {
  let score = 0;
  let index = 2;
  const [childNodes, metadataNodes] = tree.take(2);

  if (childNodes === 0) {
    score += tree.skip(2).take(metadataNodes).reduce((subtotal, x) => subtotal + x, 0);
  } else {
    let childValues = List();
    for (let _ = 0; _ < childNodes; _ += 1) {
      const childScoreAndLength = sumMetadata2(tree.skip(index));
      childValues = childValues.push(childScoreAndLength[0]);
      index += childScoreAndLength[1];
    }
    const childIds = tree.skip(index).take(metadataNodes);

    childIds.forEach(id => {
      if (id <= childNodes) {
        score += childValues.get(id - 1);
      }
    });
  }
  return [score, index + metadataNodes];
};

export {
  sumMetadata,
  parser,
  sumMetadata2,
};
