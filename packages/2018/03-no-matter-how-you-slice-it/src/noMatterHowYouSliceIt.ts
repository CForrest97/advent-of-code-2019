import { Set, List, Map } from "immutable";
import { promises as fs } from "fs";

const calculatePlots = claim => {
  let plots = List();
  const yOffset = claim.get("yOffset");
  const xOffset = claim.get("xOffset");
  const height = claim.get("height");
  const width = claim.get("width");
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      plots = plots.push(`${yOffset + i}, ${xOffset + j}`);
    }
  }
  return plots;
};

const findOverlappingPlots = claims => {
  let overlappingPlots = Set();
  let plots = Set();
  const claimedPlots = claims.flatMap(claim => calculatePlots(claim));
  claimedPlots.forEach(claimedPlot => {
    if (plots.has(claimedPlot)) {
      overlappingPlots = overlappingPlots.add(claimedPlot);
    }
    plots = plots.add(claimedPlot);
  });
  return overlappingPlots;
};

const countOverlappingPlots = claims => findOverlappingPlots(claims).size;

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  const claimStrings = List(contents.toString().split("\n"));
  return claimStrings.map(s => Map({
    id: parseInt(s.substring(s.indexOf("#") + 1, s.indexOf("@") - 1), 10),
    yOffset: parseInt(s.substring(s.indexOf("@") + 2, s.indexOf(",")), 10),
    xOffset: parseInt(s.substring(s.indexOf(",") + 1, s.indexOf(":")), 10),
    height: parseInt(s.substring(s.indexOf(":") + 2, s.indexOf("x")), 10),
    width: parseInt(s.substring(s.indexOf("x") + 1), 10),
  }));
};

const findUncontestedClaim = claims => {
  const overlappingPlots = findOverlappingPlots(claims);
  const claimedPlotsList = claims.map(claim => Map({ id: claim.get("id"), plots: calculatePlots(claim) }));

  return claimedPlotsList.find(
    claimedPlots => Set(claimedPlots.get("plots")).intersect(overlappingPlots).isEmpty(),
  ).get("id");
};

export {
  countOverlappingPlots,
  parser,
  findUncontestedClaim,
};
