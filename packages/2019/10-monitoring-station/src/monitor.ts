/* eslint-disable no-loop-func */
import { List, Set, Map } from "immutable";
import { promises as fs } from "fs";
import Vector from "../../../2018/10-the-stars-align/src/Vector";

const parser = async (file: string) => {
  const buffer: Buffer = await fs.readFile(file);
  const positions: List<List<string>> = List(buffer.toString().split("\n")).map(s => List(s.split("")));
  return positions.flatMap((row, y) => row
    .map((value, x) => (value === "#" ? new Vector(x, y) : undefined)))
    .filter(vector => vector);
};

const maximiseVisibleAsteroids = (asteroids: List<Vector>) => asteroids
  .map(asteroid => Map({
    vector: asteroid,
    count: Set(asteroids.map(asteroid2 => asteroid
      .subtractVector(asteroid2))
      .filter(asteroid2 => asteroid2.getMagnitude() !== 0)
      .map(vector => vector.getAngleFromVertical())).size,
  }))
  .maxBy(asteroid => asteroid.get("count"));

const sortAsteroidsByAngleAndMagnitude = (asteroids: List<Vector>, asteroid: Vector) => asteroids
  .map(asteroid2 => asteroid2.subtractVector(asteroid))
  .filter(asteroid2 => asteroid2.getMagnitude() !== 0)
  .sortBy(asteroid2 => asteroid2.getMagnitude())
  .sortBy(asteroid2 => asteroid2.getAngleFromVertical());

const findNthAsteroid = (a: List<Vector>, n: number): Vector => {
  let asteroids = a;
  let seen = List();
  while (seen.size < n) {
    const angles = List(Set(asteroids.map(asteroid => asteroid.getAngleFromVertical()))).sort();
    seen = seen.concat(
      angles.map(angle => asteroids.find(asteroid => asteroid.getAngleFromVertical() === angle)),
    );
    asteroids = asteroids.filter(asteroid => !seen.includes(asteroid));
  }
  return seen.get(n - 1);
};

export {
  parser,
  maximiseVisibleAsteroids,
  sortAsteroidsByAngleAndMagnitude,
  findNthAsteroid,
};
