import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const getEvents: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const events = await prisma.attendee.findMany();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getEvents;
