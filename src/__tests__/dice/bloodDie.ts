import BloodDie from "../../dice/bloodDie";

describe("BloodDie", () => {
  it("Should have 10 sides by default", () => {
    const die = new BloodDie();

    const numSides = die.inspect().length;
    expect(numSides).toStrictEqual(10);
  });

  it("Should be a success it lands in a number greater than 5", () => {
    const die = new BloodDie();

    const sides = die.inspect();
    const successSides = sides.filter((side) => side.number > 5);
    const allSuccessSidesAreSuccesses = successSides.every(
      (side) => side.success === true
    );

    expect(allSuccessSidesAreSuccesses).toStrictEqual(true);
    expect(successSides.length).toEqual(5);
  });

  it("Should be a fail it lands in a number smaller than 6", () => {
    const die = new BloodDie();

    const sides = die.inspect();
    const failSides = sides.filter((side) => side.number < 6);
    const allFailSidesAreFails = failSides.every(
      (side) => side.success === false
    );

    expect(allFailSidesAreFails).toStrictEqual(true);
    expect(failSides.length).toEqual(5);
  });

  it("Should count as a possible crit if it lands in a 10", () => {
    const die = new BloodDie();

    const sides = die.inspect();
    const critSide = sides.filter((side) => side.number === 10)[0];

    expect(critSide.possibleCrit).toStrictEqual(true);
  });

  it("Shouldn't start out as a fail or successes before the first roll", () => {
    const die = new BloodDie();

    expect(die.success).toBeUndefined();
  });

  it("Should become a success or fail after the first roll", () => {
    const die = new BloodDie();
    die.roll();

    expect(die.success).not.toBeUndefined();
  });

  it("Should be rerollable", (done) => {
    const die = new BloodDie();
    die.roll();

    const firstNumber = die.number;
    let otherNumber = firstNumber;

    jest.setTimeout(3000);
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

  it("Should be a possible messy crit if it lands in 10", () => {
    const die = new BloodDie();

    const sides = die.inspect();
    const critSide = sides.filter((side) => side.number === 10)[0];

    expect(critSide.possibleMessyCrit).toStrictEqual(true);
  });

  it("Should be a possible bestial failure if it lands in 1", () => {
    const die = new BloodDie();

    const sides = die.inspect();
    const critFailSide = sides.filter((side) => side.number === 1)[0];

    console.log(critFailSide);

    expect(critFailSide.possibleBestialFailure).toStrictEqual(true);
  });
});
