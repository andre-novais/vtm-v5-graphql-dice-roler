import Die from "../die";

export default class BloodDie extends Die {
  sides = [
    { number: 1, success: false, possibleBestialFailure: true },
    { number: 2, success: false },
    { number: 3, success: false },
    { number: 4, success: false },
    { number: 5, success: false },
    { number: 6, success: true },
    { number: 7, success: true },
    { number: 8, success: true },
    { number: 9, success: true },
    { number: 10, success: true, possibleCrit: true, possibleMessyCrit: true },
  ];
  isBloodDie = true;
}
