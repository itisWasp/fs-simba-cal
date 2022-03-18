import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const verifyToken = (token: string): any => {
  const secret: any = process.env.JWT_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

export default verifyToken;
