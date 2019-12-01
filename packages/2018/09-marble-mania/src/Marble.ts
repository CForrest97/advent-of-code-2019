export default class Marble {
  private value: number;

  public previousMarble: Marble;

  public nextMarble: Marble;

  constructor(value: number, previousMarble?: Marble, nextMarble?: Marble) {
    this.value = value;
    this.previousMarble = previousMarble || this;
    this.nextMarble = nextMarble || this;
  }

  public getValue(): number {
    return this.value;
  }
}
