import BloodDie from "../dice/bloodDie";
import Die from "../dice/die";

interface diceRollInputs {
  dice: number;
  hunger?: number;
}

interface rollOutcome {
  possibleCrit: boolean;
  possibleMessyCrit: boolean;
  possibleBestialFailure: boolean;
  successes: number;
  dice: Array<Die | BloodDie>;
}

export default class DiceRoller {
  roll(inputs: diceRollInputs): rollOutcome {
    const hunger = inputs.hunger ? inputs.hunger : 0;

    const numNormalDice = inputs.dice - hunger;
    const numBloodDice = hunger;

    const dice: Array<Die | BloodDie> = [];
    for (let i = 0; i < numNormalDice; i++) {
      const die = new Die();
      dice.push(die);
    }

    for (let i = 0; i < numBloodDice; i++) {
      const die = new BloodDie();
      dice.push(die);
    }

    for (let i = 0; i < dice.length; i++) {
      dice[i].roll();
    }

    return {
      successes: this.calcSucesses(dice),
      possibleCrit: dice.filter((die) => die.possibleCrit).length >= 2,
      possibleMessyCrit: dice.filter((die) => die.possibleMessyCrit).length > 0,
      possibleBestialFailure:
        dice.filter((die) => die.possibleBestialFailure).length > 0,
      dice: dice,
    };
  }

  calcSucesses(dice: Array<Die | BloodDie>) {
    const numPossibleCrits = dice.filter((die) => die.possibleCrit).length;
    const numSuccesses = dice.filter((die) => die.success).length;

    const numSuccessesFromCrits =
      numPossibleCrits >= 2 ? numPossibleCrits - (numPossibleCrits % 2) : 0;

    return numSuccesses + numSuccessesFromCrits;
  }
}
