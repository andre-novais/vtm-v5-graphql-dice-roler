App to roll some dice using the vampire the masquerade v5 system.
The dice are always 10 sided, 6+ counts as success, there are crits, messy crits, bestial failures and the roll implements the hunger system.

to run:

npm i
npm start

POST localhost:4000/graphql
{
  rollDice(dice: 8) {
    successes
      dice {
        number
        success
        isBloodDie
      }
    }
  }
}
