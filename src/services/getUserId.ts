import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../app/config";

const getUserIdService = (token: string | null): string | null => {
  if (!token) {
    return null;
  }

  let userId = null;

  try {
    ({ userId } = jwt.verify(token, config["APP_SECRET"]) as JwtPayload);
  } catch {}

  if (!userId) {
    return null;
  }

  return userId;
};

export default getUserIdService;
