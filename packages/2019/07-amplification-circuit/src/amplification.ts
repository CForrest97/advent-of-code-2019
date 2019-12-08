import { List } from "immutable";
import { compute } from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";
import permutate from "../../../utils/src/utils";

const amplify = (intcodes: List<number>, phaseSettings: List<number>): number => {
  let output: List<number> = List();
  let previousOutput: List<number>;
  while (!output.equals(previousOutput)) {
    previousOutput = output;
    output = output.unshift(0);
    for (let amplifier = 0; amplifier < phaseSettings.size; amplifier += 1) {
      output = compute(intcodes, output.unshift(phaseSettings.get(amplifier)));
    }
  }
  return output.last();
};

const maximiseAmplification = (intcodes: List<number>, phaseValues: List<number>): number => (
  permutate(phaseValues).map(phaseSettings => amplify(intcodes, phaseSettings)).max());

export default maximiseAmplification;
