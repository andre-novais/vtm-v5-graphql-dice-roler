import { request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../app/config";

const getUserIdService = (req: typeof request) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Error("Authorization header not found!");
  }

  const { userId } = jwt.verify(
    authorization,
    config["APP_SECRET"]
  ) as JwtPayload;

  if (!userId) {
    throw new Error("Malformed token, reset the cookies");
  }

  return userId;
};

export default getUserIdService;
