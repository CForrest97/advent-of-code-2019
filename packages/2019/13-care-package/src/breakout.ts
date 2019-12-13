import { List, Repeat } from "immutable";
import IntcodeComputer from "../../11-space-police/src/IntcodeComputer";

const countBlocks = (output: List<number>): number => output
  .filter((_, index) => !((index + 1) % 3))
  .filter(n => n === 2)
  .size;

const updateGrid = (g: List<List<number>>, output: List<number>): List<List<number>> => {
  let grid = g;
  for (let index = 0; index < output.size; index += 3) {
    const [x, y, tile] = output.skip(index).take(3);
    grid = grid.update(y, value => value.set(x, tile));
  }
  return grid;
};

const findTile = (grid: List<List<number>>, tile: number): number => grid
  .map(row => row.findIndex(t => t === tile))
  .filter(index => index > 0)
  .first();

const loadBreakout = (intcode: List<number>) => {
  const computer = new IntcodeComputer(intcode, List());
  computer.compute();
  let output;
  let outputIndex = 0;
  let grid: List<List<number>> = List(Repeat(List(Repeat(0, 40)), 25));
  while (true) {
    output = computer.getOutputs();
    grid = updateGrid(grid, output.skip(outputIndex));
    if (!findTile(grid, 2)) break;
    outputIndex = output.size;
    const paddleX = findTile(grid, 3);
    const ballX = findTile(grid, 4);

    if (ballX < paddleX) {
      computer.addInput(-1);
    } else if (ballX > paddleX) {
      computer.addInput(1);
    } else {
      computer.addInput(0);
    }
  }
  const firstRow: List<number> = grid.first();
  return firstRow.last();
};

export {
  countBlocks,
  loadBreakout,
};
