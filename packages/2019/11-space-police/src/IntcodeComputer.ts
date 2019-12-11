import { List, Map } from "immutable";

const getParameterModes = (instructionCode: number): List<number> => {
  let parameterModes = List();
  let code = Math.floor(instructionCode / 100);
  for (let parameterIndex = 0; parameterIndex < 3; parameterIndex += 1) {
    parameterModes = parameterModes.push(code % 10);
    code = Math.floor(code / 10);
  }
  return parameterModes;
};

const add = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) + intCodes.get(parameters[1]));
const multiply = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) * intCodes.get(parameters[1]));
const storeInput = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[0], parameters[3]);
const identity = (intCodes: List<number>): List<number> => intCodes;
const isLessThan = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) < intCodes.get(parameters[1]) ? 1 : 0);
const isEqual = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) === intCodes.get(parameters[1]) ? 1 : 0);

const addFour = (index: number): number => index + 4;
const addTwo = (index: number): number => index + 2;
const jumpIfTrue = (index: number, intCodes: List<number>, ...parameters): number => (
  intCodes.get(parameters[0]) ? intCodes.get(parameters[1]) : index + 3);
const jumpIfFalse = (index: number, intCodes: List<number>, ...parameters): number => (
  intCodes.get(parameters[0]) ? index + 3 : intCodes.get(parameters[1]));

const opcodes = Map.of(
  1, Map({ updateIntCode: add, updateIndex: addFour }),
  2, Map({ updateIntCode: multiply, updateIndex: addFour }),
  3, Map({ updateIntCode: storeInput, updateIndex: addTwo }),
  4, Map({ updateIntCode: identity, updateIndex: addTwo }),
  5, Map({ updateIntCode: identity, updateIndex: jumpIfTrue }),
  6, Map({ updateIntCode: identity, updateIndex: jumpIfFalse }),
  7, Map({ updateIntCode: isLessThan, updateIndex: addFour }),
  8, Map({ updateIntCode: isEqual, updateIndex: addFour }),
  9, Map({ updateIntCode: identity, updateIndex: addTwo }),
);

export default class IntcodeComputer {
    private intcode: List<number>;

    private index: number = 0;

    private inputs: List<number>;

    private outputs: List<number> = List();

    private isCompleteVariable = false;

    private isBlockedVariable = false;

    private relativeBase = 0;

    constructor(intcode: List<number>, initialInputs: List<number>) {
      this.intcode = intcode;
      this.inputs = initialInputs;
    }

    public compute(): void {
      while (true) {
        let [
          instructionCode,
          parameter1,
          parameter2,
          parameter3,
        ] = this.intcode.skip(this.index).take(4);
        if (instructionCode === 99) {
          this.isCompleteVariable = true;
          return;
        }

        const parameterModes = getParameterModes(instructionCode);

        if (parameterModes.get(0) === 1) {
          parameter1 = this.index + 1;
        } else if (parameterModes.get(0) === 2) {
          parameter1 += this.relativeBase;
        }
        if (parameterModes.get(1) === 1) {
          parameter2 = this.index + 2;
        } else if (parameterModes.get(1) === 2) {
          parameter2 += this.relativeBase;
        }
        if (parameterModes.get(2) === 1) {
          parameter3 = this.index + 3;
        } else if (parameterModes.get(2) === 2) {
          parameter3 += this.relativeBase;
        }

        instructionCode %= 10;
        if (instructionCode === 3) {
          if (this.inputs.size === 0) {
            this.isBlockedVariable = true;
            return;
          }
        }
        this.intcode = opcodes.get(instructionCode).get("updateIntCode")(this.intcode, parameter1, parameter2, parameter3, this.inputs.get(0));
        this.index = opcodes.get(instructionCode).get("updateIndex")(this.index, this.intcode, parameter1, parameter2);

        if (instructionCode === 4) {
          this.outputs = this.outputs.push(this.intcode.get(parameter1));
        } else if (instructionCode === 3) {
          this.inputs = this.inputs.shift();
        } else if (instructionCode === 9) {
          this.relativeBase += this.intcode.get(parameter1);
        }
      }
    }

    public getIndex(): number {
      return this.index;
    }

    public getIntcode(): List<number> {
      return this.intcode;
    }

    public isComplete(): boolean {
      return this.isCompleteVariable;
    }

    public isBlocked(): boolean {
      return this.isBlockedVariable;
    }

    public getOutputs(): List<number> {
      return this.outputs;
    }

    public addInput(input: number): void {
      this.inputs = this.inputs.push(input);
      this.isBlockedVariable = false;
      this.compute();
    }
}
