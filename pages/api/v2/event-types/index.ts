import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const eventTypes = await prisma.eventTypes.findMany({
      orderBy: { id: "desc" },
      include: { user: true, events: true },
    });
    res.status(200).json({
      status: "success",
      message: "Event types retrieved successfully",
      data: eventTypes,
    });
  }
  if (req.method === "POST") {
    try {
      const { Name, Duration } = req.body;
      const eventTypes = await prisma.eventTypes.create({
        data: {
          name: Name,
          duration: Duration,
        },
      });
      res.status(200).json({ message: "Event saved successfully", eventTypes });
    } catch (error) {
      res.status(400).json({ message: "Error saving event", error });
    }
  }
};

export default handler;
