import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

const UserRegistration: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { UserName, Email, Password } = req.body;

  //check if the email is already registered
  const emailExists = await prisma.user.findUnique({
    where: { email: Email },
  });

  if (emailExists)
    return res.status(400).json({ message: "Email already exists" });

  //password Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        username: UserName,
        email: Email,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "User Register Successfully", User: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default UserRegistration;
