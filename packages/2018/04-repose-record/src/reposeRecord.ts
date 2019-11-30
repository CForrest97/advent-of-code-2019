import { List, Map } from "immutable";
import { promises as fs } from "fs";
import Guard from "./Guard";

const countSleepingMinutes = logs => {
  let guards: Map<number, Guard> = Map();
  let currentGuardId;
  let sleepTime;
  logs.forEach(log => {
    if (log.get("action") === "begins shift") {
      currentGuardId = log.get("number");
      guards = guards.update(currentGuardId, guard => guard || new Guard(currentGuardId));
    } else if (log.get("action") === "falls asleep") {
      sleepTime = log.get("number");
    } else if (log.get("action") === "wakes up") {
      guards.get(currentGuardId).addMinutes(sleepTime, log.get("number"));
    }
  });
  return guards;
};

const strategy1 = (logs): number => {
  let guards: Map<number, Guard> = countSleepingMinutes(logs);
  guards = guards.sortBy(guard => guard.getTotalSleepingMinutes());
  const longestSleeper: Guard = guards.last();
  return longestSleeper.getId() * longestSleeper.getSleepiestMinute();
};

const strategy2 = logs => {
  let guards: Map<number, Guard> = countSleepingMinutes(logs);
  guards = guards.sortBy(guard => guard.getMinute(guard.getSleepiestMinute()));
  const longestSleeper: Guard = guards.last();
  return longestSleeper.getId() * longestSleeper.getSleepiestMinute();
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
      dateTime,
      action,
      number: parseInt(number[1], 10),
    });
  }).sortBy(log => log.get("dateTime"));
};

export {
  countSleepingMinutes,
  strategy1,
  parser,
  strategy2,
};
