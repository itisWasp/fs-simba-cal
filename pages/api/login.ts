import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

const UserLogin: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { Email, Password } = req.body;
  // check if the email and passowrd exists in the database...
  const user = await prisma.user.findUnique({
    where: { email: Email },
  });
  if (!user)
    return res.status(400).json({ message: "Invalid Email Plz Try Again" });

  const validPassword = await bcrypt.compare(Password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid Password Plz Try Again" });

  try {
    const token = jwt.sign(
      {
        user: { id: user.id, username: user.username },
      },
      "jfshffgjfgjfghefgfwj",
      { expiresIn: process.env.TOKEN_EXPIRE }
    );

    res.setHeader("auth-token", token);
    res
      .status(200)
      .json({ message: "User Logged In successfully", token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default UserLogin;
