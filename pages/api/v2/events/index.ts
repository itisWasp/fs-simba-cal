import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const eventsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const events = await prisma.events.findMany({
      include: { eventType: { include: { user: true } } },
    });

    res.status(200).json({
      status: "success",
      message: "Events retrieved successfully",
      data: events,
    });
  }

  if (req.method === "POST") {
    const { Date, Time, Name, Email, Guests, eventType: id, notes } = req.body;

    const attendeeInfo: any = {
      name: Name,
      email: Email,
    };
    const eventInfo: any = {
      // name: Name,
      // email: Email,
      date: Date,
      // Time,
      // guests: Guests,
      // notes: notes,
      eventTypeId: Number(id),
    };

    const attendee = await prisma.attendees.create({
      data: attendeeInfo,
    });
  }
};

export default eventsHandler;
