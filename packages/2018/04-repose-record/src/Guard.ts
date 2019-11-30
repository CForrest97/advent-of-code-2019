import { List, Range } from "immutable";

export default class Guard {
  private minutes: List<number> = List().setSize(60).map(() => 0);

  private id: number;

  constructor(id: number) {
    this.id = id;
  }

  public addMinutes(start, end) {
    Range(start, end).forEach(min => {
      this.minutes = this.minutes.update(min, value => value + 1);
    });
  }

  public getTotalSleepingMinutes() {
    return this.minutes.reduce((subtotal, x) => subtotal + x, 0);
  }

  public getSleepiestMinute() {
    return this.minutes.findIndex(minute => minute === this.minutes.max());
  }

  public getId() {
    return this.id;
  }

  public getMinute(minute) {
    return this.minutes.get(minute);
  }
}
