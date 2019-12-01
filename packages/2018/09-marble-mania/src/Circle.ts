// eslint-disable-next-line no-unused-vars
import Marble from "./Marble";

export default class Circle {
  currentMarble: Marble;

  constructor(marble: Marble) {
    this.currentMarble = marble;
  }

  public addMarble(m: Marble): void {
    const marble = m;
    const { nextMarble } = this.currentMarble;

    marble.previousMarble = nextMarble;
    marble.nextMarble = nextMarble.nextMarble;

    nextMarble.nextMarble = marble;
    marble.nextMarble.previousMarble = marble;

    this.currentMarble = marble;
  }

  public removeSeventhBack(): Marble {
    let marble = this.currentMarble;
    for (let _ = 0; _ < 7; _ += 1) {
      marble = marble.previousMarble;
    }

    marble.previousMarble.nextMarble = marble.nextMarble;
    marble.nextMarble.previousMarble = marble.previousMarble;
    this.currentMarble = marble.nextMarble;
    return marble;
  }
}
