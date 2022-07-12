import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../app/config";
import UserModel from "../models/user";

const singInService = async (userName: string, password: string) => {
  const user = await UserModel.findOne({ name: userName });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password!");
  }

  const token = jwt.sign({ userId: user._id }, config["APP_SECRET"]);

  return { token, user };
};

export default singInService;
