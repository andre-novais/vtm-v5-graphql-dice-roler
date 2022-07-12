import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../app/config";
import UserModel from "../models/user";

const singInService = async (userName: string, password: string) => {
  const oldUser = await UserModel.findOne({ name: userName });

  if (oldUser) {
    throw new Error("User already exists");
  }

  const hash = bcrypt.hash(password, 14);
  const user = await UserModel.create({ name: userName, password: hash });

  const token = jwt.sign({ userId: user._id }, config["APP_SECRET"]);

  return { token, user };
};

export default singInService;
