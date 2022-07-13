import Die from "../../models/dice/die";

describe("Die", () => {
  it("Should have 10 sides by default", () => {
    const die = new Die();

    const numSides = die.inspect().length;
    expect(numSides).toStrictEqual(10);
  });

  it("Should be a success it lands in a number greater than 5", () => {
    const die = new Die();

    const sides = die.inspect();
    const successSides = sides.filter((side) => side.number > 5);
    const allSuccessSidesAreSuccesses = successSides.every(
      (side) => side.success === true
    );

    expect(allSuccessSidesAreSuccesses).toStrictEqual(true);
    expect(successSides.length).toEqual(5);
  });

  it("Should be a fail it lands in a number smaller than 6", () => {
    const die = new Die();

    const sides = die.inspect();
    const failSides = sides.filter((side) => side.number < 6);
    const allFailSidesAreFails = failSides.every(
      (side) => side.success === false
    );

    expect(allFailSidesAreFails).toStrictEqual(true);
    expect(failSides.length).toEqual(5);
  });

  it("Should count as a possible crit if it lands in a 10", () => {
    const die = new Die();

    const sides = die.inspect();
    const critSide = sides.filter((side) => side.number === 10)[0];

    expect(critSide.possibleCrit).toStrictEqual(true);
  });

  it("Shouldn't start out as a fail or successes before the first roll", () => {
    const die = new Die();

    expect(die.success).toBeUndefined();
  });

  it("Should become a success or fail after the first roll", () => {
    const die = new Die();
    die.roll();

    expect(die.success).not.toBeUndefined();
  });

  it("Should be rerollable", (done) => {
    const die = new Die();
    die.roll();

    const firstNumber = die.number;
    let otherNumber = firstNumber;

    let counter = 0;

    while (firstNumber == otherNumber && counter < 30) {
      die.roll();

      otherNumber = die.number;
      counter++;
    }

    expect(die.number).toEqual(otherNumber);
    expect(firstNumber).not.toEqual(otherNumber);
    done();
  });
});
