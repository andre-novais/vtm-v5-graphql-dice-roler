import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import DiceRoller from "../models/diceRoller";
import config from "./config";

var schema = buildSchema(`
  type Die {
    number: Int!
    success: Boolean
    isBloodDie: Boolean
  }
  type RollResults {
    successes: Int!
    dice: [Die]
  }
  type Query {
    rollDice(dice: Int!, hunger: Int): RollResults
  }
`);

var root = {
  rollDice: ({ dice, hunger }: { dice: number; hunger: number }) => {
    return new DiceRoller().roll({ dice, hunger });
  },
};

const mongoDB = config["mongoDB"];
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

var app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export default app;
