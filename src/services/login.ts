import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../app/config";
import UserModel from "../models/user";

const loginService = async (name: string, password: string) => {
  const user = await UserModel.findOne({ name });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password!");
  }

  const token = jwt.sign(
    { userId: user._id, exp: config["jwtExpiration"] },
    config["APP_SECRET"]
  );

  return { token, user };
};

export default loginService;
