import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const attendeeInfo: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { Name, Email } = req.body;

  try {
    const user = await prisma.attendee.create({
      data: {
        name: Name,
        email: Email,
      },
    });
    res
      .status(200)
      .json({ message: "Attendee Register Successfully", User: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default attendeeInfo;
