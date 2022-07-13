import { Request } from "express";

const isLoggedIn = (req: Request) => {
  if (!req["user"]) {
    return false;
  }

  return true;
};

export default isLoggedIn;
