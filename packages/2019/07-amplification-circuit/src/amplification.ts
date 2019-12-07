import { List, Set } from "immutable";
import { compute } from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

const amplify = (intcodes: List<number>, phaseSettings: List<number>) => {
  let amplifier0Inputs = List.of(phaseSettings.get(0), 0);
  let amplifier1Inputs = List.of(phaseSettings.get(1));
  let amplifier2Inputs = List.of(phaseSettings.get(2));
  let amplifier3Inputs = List.of(phaseSettings.get(3));
  let amplifier4Inputs = List.of(phaseSettings.get(4));

  while (true) {
    amplifier1Inputs = amplifier1Inputs.push(compute(intcodes, amplifier0Inputs).last());
    amplifier2Inputs = amplifier2Inputs.push(compute(intcodes, amplifier1Inputs).last());
    amplifier3Inputs = amplifier3Inputs.push(compute(intcodes, amplifier2Inputs).last());
    amplifier4Inputs = amplifier4Inputs.push(compute(intcodes, amplifier3Inputs).last());
    amplifier0Inputs = amplifier0Inputs.push(compute(intcodes, amplifier4Inputs).last());

    if (amplifier0Inputs.size !== Set(amplifier0Inputs).size) return amplifier0Inputs.last();
  }
};

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

const maximiseAmplification = (intcodes: List<number>, phaseSettings: List<number>) => (
  permutate(phaseSettings)
    .map(phaseSetting => amplify(intcodes, phaseSetting))
    .sort()
    .last()
);

export default maximiseAmplification;
