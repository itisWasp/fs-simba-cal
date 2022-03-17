import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const book: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { StartDate, EndDate } = req.body;

  try {
    const book = await prisma.booking.create({
      data: {
        startTime: StartDate,
        endTime: EndDate,
      },
    });
    res.status(200).json({ message: "Booked Reservation successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default book;
