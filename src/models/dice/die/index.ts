import Side from "../side";

export default class Die {
  number?: number;
  success?: boolean;
  possibleCrit?: boolean;
  possibleMessyCrit?: boolean;
  possibleBestialFailure?: boolean;
  sides: Side[] = [
    { number: 1, success: false },
    { number: 2, success: false },
    { number: 3, success: false },
    { number: 4, success: false },
    { number: 5, success: false },
    { number: 6, success: true },
    { number: 7, success: true },
    { number: 8, success: true },
    { number: 9, success: true },
    { number: 10, success: true, possibleCrit: true },
  ];
  isBloodDie = false;

  roll() {
    const topSide = this.sides[Math.floor(Math.random() * this.sides.length)];

    this.updateDie(topSide);
  }

  updateDie(side: Side) {
    this.number = side.number;
    this.success = side.success;
    this.possibleCrit = side.possibleCrit;
    this.possibleBestialFailure = side.possibleBestialFailure;
    this.possibleMessyCrit = side.possibleMessyCrit;
  }

  inspect() {
    return this.sides;
  }
}
