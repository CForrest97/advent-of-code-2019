import { List, Map, Range } from "immutable";
import { promises as fs } from "fs";

const countSleepingMinutes = logs => {
  let currentGuard;
  let sleepTime;
  let guards = List();
  logs.forEach(element => {
    if (element.get("action") === "begins shift") {
      currentGuard = element.get("number");
      if (!guards.find(guard => guard.get("id") === element.get("number"))) {
        guards = guards.push(Map({ id: element.get("number"), minutes: List() }));
      }
    } else if (element.get("action") === "falls asleep") {
      sleepTime = element.get("number");
    } else if (element.get("action") === "wakes up") {
      const guardIndex = guards.findIndex(guard => guard.get("id") === currentGuard);
      guards = guards.update(guardIndex, guard => guard.update("minutes", minutes => minutes.concat(Range(sleepTime, element.get("number")))));
    }
  });
  return guards;
};

const processGuard = guard => {
  const maxOccurances = guard.get("minutes").countBy(x => x).max();
  return Map({
    id: guard.get("id"),
    count: guard.get("minutes").count(),
    maxOccurances,
    mode: guard.get("minutes").countBy(x => x).findKey(value => value === maxOccurances),
  });
};

const strategy1 = logs => {
  let guards = countSleepingMinutes(logs);
  guards = guards.map(guard => processGuard(guard));
  guards = guards.sort((a, b) => b.get("count") - a.get("count"));
  const longestSleeper = guards.first();
  return longestSleeper.get("id") * longestSleeper.get("mode");
};

const strategy2 = logs => {
  let guards = countSleepingMinutes(logs);
  guards = guards.map(guard => processGuard(guard));
  guards = guards.sort((a, b) => b.get("maxOccurances") - a.get("maxOccurances"));
  const mostRegularSleeper = guards.first();
  return mostRegularSleeper.get("id") * mostRegularSleeper.get("mode");
};

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  const logStrings = List(contents.toString().split("\n"));
  return logStrings.map(s => {
    let [, dateTime, action] = s.match(/\[(.+)\] (.*)/);
    if (action.includes("begins shift")) action = "begins shift";
    const number = action === "begins shift"
      ? s.match(/.*Guard #(.*) begins shift/)
      : s.match(/.*:(.*) .*/);

    return Map({
      "date-time": dateTime,
      action,
      number: parseInt(number[1], 10),
    });
  }).sort((a, b) => a.get("date-time").toString().localeCompare(b.get("date-time").toString()));
};

export {
  countSleepingMinutes,
  strategy1,
  parser,
  strategy2,
};
