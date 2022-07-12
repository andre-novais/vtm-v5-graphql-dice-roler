import DiceRoller from "../diceRoller";

interface CheckInputs {
  dots: number;
  hunger?: number;
  difficulty: number;
}

export default class Check {
  outcome:
    | "success"
    | "fail"
    | "critical success"
    | "messy critical"
    | "bestial failure";
  margin: number;

  constructor(inputs: CheckInputs) {
    const hunger = inputs.hunger ? inputs.hunger : 0;

    const roller = new DiceRoller();
    const rollOutcome = roller.roll({
      dice: inputs.dots,
      hunger: hunger,
    });

    if (rollOutcome.successes >= inputs.difficulty) {
      if (rollOutcome.possibleMessyCrit) {
        this.outcome = "messy critical";
      } else if (rollOutcome.possibleCrit) {
        this.outcome = "critical success";
      } else {
        this.outcome = "success";
      }
    } else {
      if (rollOutcome.possibleBestialFailure) {
        this.outcome = "bestial failure";
      } else {
        this.outcome = "fail";
      }
    }

    this.margin = rollOutcome.successes - inputs.difficulty;
  }
}
