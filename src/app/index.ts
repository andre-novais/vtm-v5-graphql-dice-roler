import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import config from "./config";
import getUser from "./middleswares/getUser";
import login from "./resolvers/login";
import rollDice from "./resolvers/rollDice";
import signUp from "./resolvers/signUp";

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

  type User {
    name: String!
  }

  type loginResult {
    token: String
    user: User
  }

  type Mutation {
    signUp(name: String!, password: String!): loginResult
    login(name: String!, password: String!): loginResult
  }
`);

const root = {
  rollDice,
  signUp,
  login,
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

app.use(getUser);

//app.use("/dice", loginRequired);

app.use(
  "/dice/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export default app;
