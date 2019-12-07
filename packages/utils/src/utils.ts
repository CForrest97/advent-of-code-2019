import { List } from "immutable";

const permutate = (xs: List<any>) => {
  let permutations = List();
  for (let i = 0; i < xs.size; i += 1) {
    const rest = permutate(xs.slice(0, i).concat(xs.slice(i + 1)));
    if (!rest.size) {
      permutations = permutations.push(List([xs.get(i)]));
    } else {
      for (let j = 0; j < rest.size; j += 1) {
        permutations = permutations.push(List([xs.get(i)]).concat(rest.get(j)));
      }
    }
  }
  return permutations;
};

export default permutate;
