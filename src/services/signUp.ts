import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../app/config";
import UserModel from "../models/user";

const signUpService = async (name: string, password: string) => {
  const oldUser = await UserModel.findOne({ name: name });

  if (oldUser) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(password, 14);
  const user = await UserModel.create({ name, password: hash });

  const token = jwt.sign(
    { userId: user._id, exp: config["jwtExpiration"] },
    config["APP_SECRET"]
  );

  return { token, user };
};

export default signUpService;
