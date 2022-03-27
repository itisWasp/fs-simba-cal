import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const eventType = await prisma.eventTypes.findUnique({
      where: { id: Number(id) },
      include: { user: true, events: true },
    });
    if (eventType === null) {
      return res.status(404).json({
        status: "failed",
        error: "Event type not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Event type retrieved successfully",
      data: eventType,
    });
  }
};

export default handler;
