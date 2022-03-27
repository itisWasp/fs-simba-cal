import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const attendeeInfo: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { Name, Email, Date }: any = req.body;

  if (req.method == "POST") {
    try {
      const user = await prisma.attendee.create({
        data: {
          name: Name,
          email: Email,
          date: Date,
        },
      });
      res
        .status(200)
        .json({ message: "Attendee Register Successfully", User: user });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (req.method == "GET") {
    try {
      const data = await prisma.attendee.findMany();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json(error);
    }
  }
};

export default attendeeInfo;
