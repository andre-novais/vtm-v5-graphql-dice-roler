import Die from "../../dice/die";
import DiceRoller from "../../diceRoller";

describe("Roller", () => {
  it("Should be able to roll multiple dice and return the number of successes", () => {
    const diceRoller = new DiceRoller();

    let counter = 0;
    let gotASuccess = false;

    while (!gotASuccess && counter < 30) {
      const check = diceRoller.roll({ dice: 80 });

      gotASuccess = check.successes > 0;
      counter++;
    }

    expect(gotASuccess).toEqual(true);
  });

  it("Should convert dices into BloodDie and return its states", () => {
    const diceRoller = new DiceRoller();

    let counter = 0;
    let gotASuccess = false;
    let gotAMessyCrit = false;
    let gotABestialFailure = false;

    while (!gotASuccess && counter < 60) {
      const check = diceRoller.roll({ dice: 80, hunger: 60 });

      if (!gotASuccess) {
        gotASuccess = check.successes > 0;
      }

      if (!gotAMessyCrit) {
        gotAMessyCrit = check.possibleMessyCrit;
      }

      if (!gotABestialFailure) {
        gotABestialFailure = check.possibleBestialFailure;
      }

      counter++;
    }

    expect(gotASuccess).toEqual(true);
    expect(gotAMessyCrit).toEqual(true);
    expect(gotABestialFailure).toEqual(true);
  });

  it("Should calculate criticals", () => {
    const diceRoller = new DiceRoller();
    let counter = 0;
    let gotACrit = false;

    while (!gotACrit && counter < 30) {
      const check = diceRoller.roll({ dice: 80 });

      gotACrit = check.possibleCrit;

      counter++;
    }

    expect(gotACrit).toEqual(true);
  });

  it("Should return the check's dice", () => {
    const diceRoller = new DiceRoller();
    const check = diceRoller.roll({ dice: 80 });

    expect(check.dice[0]).toBeInstanceOf(Die);
  });
});
