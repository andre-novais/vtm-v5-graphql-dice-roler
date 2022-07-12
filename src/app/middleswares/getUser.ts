import { request } from "express";
import UserModel from "../../models/user";
import getUserIdService from "../../services/getUserId";

const getUser = (req: typeof request) => {
  const userId = getUserIdService(req);
  const user = UserModel.findOne({ _id: userId });

  req.user = user;
};

export default getUser;
