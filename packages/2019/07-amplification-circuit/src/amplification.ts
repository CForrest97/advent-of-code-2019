import { List, Set } from "immutable";
import { compute } from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";
import permutate from "../../../utils/src/utils";

const amplify = (intcodes: List<number>, phaseSettings: List<number>): number => {
  let amplifier0Inputs = List.of(phaseSettings.get(0), 0);
  let amplifier1Inputs = List.of(phaseSettings.get(1));
  let amplifier2Inputs = List.of(phaseSettings.get(2));
  let amplifier3Inputs = List.of(phaseSettings.get(3));
  let amplifier4Inputs = List.of(phaseSettings.get(4));

  while (amplifier0Inputs.size === Set(amplifier0Inputs).size) {
    amplifier1Inputs = amplifier1Inputs.push(compute(intcodes, amplifier0Inputs).last());
    amplifier2Inputs = amplifier2Inputs.push(compute(intcodes, amplifier1Inputs).last());
    amplifier3Inputs = amplifier3Inputs.push(compute(intcodes, amplifier2Inputs).last());
    amplifier4Inputs = amplifier4Inputs.push(compute(intcodes, amplifier3Inputs).last());
    amplifier0Inputs = amplifier0Inputs.push(compute(intcodes, amplifier4Inputs).last());
  }
  return amplifier0Inputs.last();
};

const maximiseAmplification = (intcodes: List<number>, phaseValues: List<number>): number => (
  permutate(phaseValues).map(phaseSetting => amplify(intcodes, phaseSetting)).max());

export default maximiseAmplification;
