import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user";
import getUserIdService from "../../services/getUserId";

const getUser = async (req: Request, _res: Response, next: NextFunction) => {
  const userId = getUserIdService(req.headers.authorization as string);

  const user = await UserModel.findOne({ _id: userId });

  req.user = user;

  next();
};

export default getUser;
