import dotenv from "dotenv";
dotenv.config();

export default {
  mongoDB: `mongodb+srv://Cluster${process.env.MONGO_CLUSTER}:${process.env.MONGO_PSWD}@cluster${process.env.MONGO_CLUSTER}.scighkw.mongodb.net/?retryWrites=true&w=majority`,
  APP_SECRET: process.env.APP_SECRET || "secret",
};
