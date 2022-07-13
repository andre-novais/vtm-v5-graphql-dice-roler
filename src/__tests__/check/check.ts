import Check from "../../models/check";

describe("Check", () => {
  it("Should receive a number of dots and a difficulty and roll the check", () => {
    let possibleOutcomes = [
      "success",
      "fail",
      "bestialFailure",
      "critical successs",
      "messy critical",
    ];
    let accountedOutcomes: string[] = [];

    let counter = 0;
    while (
      accountedOutcomes.length < possibleOutcomes.length &&
      counter < 300
    ) {
      const check = new Check({ dots: 8, hunger: 4, difficulty: 3 });
      if (!accountedOutcomes.includes(check.outcome)) {
        accountedOutcomes.push(check.outcome);
      }

      counter++;
    }

    expect(accountedOutcomes.length).toEqual(possibleOutcomes.length);
  });

  it("Should calculate the success margin", () => {
    const check = new Check({ dots: 8, difficulty: 4 });
    const marginInsideRange = check.margin <= 4 && check.margin >= -4;

    expect(marginInsideRange).toEqual(true);
  });
});
