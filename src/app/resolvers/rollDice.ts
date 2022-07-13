import { Request } from "express";
import DiceRoller from "../../models/diceRoller";
import isLoggedIn from "../helpers/isLoggedIn";

const rollDice = (
  { dice, hunger }: { dice: number; hunger: number },
  context: Request
) => {
  const userIsLoggedIn = isLoggedIn(context);

  if (!userIsLoggedIn) {
    return null;
  }

  return new DiceRoller().roll({ dice, hunger });
};

export default rollDice;
