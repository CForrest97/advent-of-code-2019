import { List, Repeat } from "immutable";
import Circle from "./Circle";
import Marble from "./Marble";

const playMarbleMania = (numberOfPlayers: number, numberOfMarbles: number): number => {
  const marble = new Marble(0);
  const circle: Circle = new Circle(marble);

  let players = List(Repeat(0, numberOfPlayers));

  for (let marbleValue = 1; marbleValue <= numberOfMarbles; marbleValue += 1) {
    if (marbleValue % 23) {
      circle.addMarble(new Marble(marbleValue));
    } else {
      const removedMarble = circle.removeSeventhBack();
      players = players.update(
        marbleValue % numberOfPlayers, score => score + marbleValue + removedMarble.getValue(),
      );
    }
  }
  return players.max();
};

export default playMarbleMania;
