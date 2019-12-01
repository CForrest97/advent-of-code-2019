import { List } from "immutable";
import { promises as fs } from "fs";

const calculateFuelRequred = (mass: number): number => Math.max(Math.floor(mass / 3) - 2, 0);

const sumRequiredRocketFuel = (input: List<number>): number => input
  .map((mass: number) => calculateFuelRequred(mass))
  .reduce((subtotal, x) => subtotal + x, 0);

const recursivelySumRocketFuel = (input: List<number>): number => input
  .map((mass: number) => {
    let totalFuelRequired: number = 0;
    let fuelRequired: number = calculateFuelRequred(mass);
    while (fuelRequired) {
      totalFuelRequired += fuelRequired;
      fuelRequired = calculateFuelRequred(fuelRequired);
    }
    return totalFuelRequired;
  }).reduce((subtotal, x) => subtotal + x, 0);

const parser = async (filePath: string): Promise<List<number>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const frequencyStrings = List(contents.toString().split("\n"));
  return frequencyStrings.map(n => parseInt(n, 10));
};

export {
  sumRequiredRocketFuel,
  parser,
  recursivelySumRocketFuel,
};
