/* eslint-disable no-loop-func */
import { List, Set } from "immutable";
import { promises as fs } from "fs";
import Moon from "./Moon";
import Vector from "./Vector";

const parser = async (file: string): Promise<List<Moon>> => {
  const buffer: Buffer = await fs.readFile(file);
  const moons: List<string> = List(buffer.toString().split("\n"));

  return moons.map(moon => {
    const [, x, y, z] = moon.match(/.*=(.*),.*=(.*),.*=(.*)>/);
    const startingPosition = new Vector(parseInt(x, 10), parseInt(y, 10), parseInt(z, 10));
    return new Moon(startingPosition);
  });
};

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lowestCommonMultiple = (a, b) => (a * b) / gcd(a, b);

const getAcceleration = (moon: Moon, moons: List<Moon>): Vector => {
  const positions = moons.map(m => m.getPosition());
  const x = positions.filter(position => moon.getPosition().getX() < position.getX()).size
    - positions.filter(position => moon.getPosition().getX() > position.getX()).size;
  const y = positions.filter(position => moon.getPosition().getY() < position.getY()).size
    - positions.filter(position => moon.getPosition().getY() > position.getY()).size;
  const z = positions.filter(position => moon.getPosition().getZ() < position.getZ()).size
    - positions.filter(position => moon.getPosition().getZ() > position.getZ()).size;
  return new Vector(x, y, z);
};

const getTotalEnergyAfterNSteps = (moons: List<Moon>, maxTicks: number) => {
  for (let _ = 0; _ < maxTicks; _ += 1) {
    const accelerants = moons.map(moon => getAcceleration(moon, moons));
    moons.zip(accelerants).forEach(([moon, accelerant]) => moon.updateVelocity(accelerant));
    moons.forEach((moon: Moon) => moon.updatePosition());
  }
  return moons.map(moon => moon.getTotalEnergy()).reduce((subtotal, e) => subtotal + e, 0);
};

const calculateCycleLength = (moons: List<Moon>): number => {
  let xs = Set();
  let ys = Set();
  let zs = Set();
  let cycleLengths = List();
  let tick = 0;
  let foundX = false;
  let foundY = false;
  let foundZ = false;
  while (cycleLengths.size < 3) {
    const x = `${moons.map(moon => moon.getPosition().getX()).join()}-${moons.map(moon => moon.getVelocity().getX()).join()}`;
    if (!foundX && xs.has(x)) {
      cycleLengths = cycleLengths.push(tick);
      foundX = true;
    }
    xs = xs.add(x);
    const y = `${moons.map(moon => moon.getPosition().getY()).join()}-${moons.map(moon => moon.getVelocity().getY()).join()}`;
    if (!foundY && ys.has(y)) {
      cycleLengths = cycleLengths.push(tick);
      foundY = true;
    }
    ys = ys.add(y);
    const z = `${moons.map(moon => moon.getPosition().getZ()).join()}-${moons.map(moon => moon.getVelocity().getZ()).join()}`;
    if (!foundZ && zs.has(z)) {
      cycleLengths = cycleLengths.push(tick);
      foundZ = true;
    }
    zs = zs.add(z);

    tick += 1;
    const accelerants = moons.map(moon => getAcceleration(moon, moons));
    moons.zip(accelerants).forEach(([moon, accelerant]) => moon.updateVelocity(accelerant));
    moons.forEach((moon: Moon) => moon.updatePosition());
  }
  return cycleLengths.reduce(lowestCommonMultiple);
};

export {
  parser,
  getTotalEnergyAfterNSteps,
  lowestCommonMultiple,
  calculateCycleLength,
};
