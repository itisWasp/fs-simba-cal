import React, { useEffect, useState } from "react";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Sidebar from "../components/shared/Sidebar";

type Props = {};

const Events = (props: Props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllEvents = async () => {
      const response = await axios.get("/api/attendee");
      setData(response.data);
      console.log(response.data);
    };
    getAllEvents();
  }, []);

  return (
    <div className="flex flex-row items-start justify-between">
      <Head>
        <title>Bookings | Cal.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div className="h-screen w-[80%] bg-secondary p-12 flex flex-col">
        <div className="flex flex-col items-start justify-center">
          <span className="text-base font-bold">Bookings</span>
          <span className="text-gray-500">
            See upcoming and past events booked through your event type links.
          </span>
        </div>
        <div className="flex flex-row items-center w-full my-5">
          <ul className="flex flex-row items-center">
            <li className="mr-5">
              <a href="#">Upcoming</a>
            </li>
            <li className="mx-5">
              <a href="#">Past</a>
            </li>
            <li className="mx-5">
              <a href="#">Cancelled</a>
            </li>
          </ul>
        </div>
        <div className="w-full h-px bg-primary" />
        {data.map((event: any) => (
          <div
            className="flex flex-row items-center justify-between w-full px-5 py-5 mt-10 bg-white border-2 border-secondary"
            key={event.id}
          >
            <div className="flex flex-col justify-between cursor-pointer">
              <div className="flex flex-row my-2 text-xs">
                <span className="font-bold">{event.date}</span>
                <span className="ml-3 font-semibold">
                  Secret Meeting between {event.name} and{" "}
                  {/* {event.eventType.user.name} */}
                  Mugisha Israel
                </span>
              </div>
              <div className="flex flex-row items-center justify-start my-2 text-xs">
                <span className="ml-1 mr-3 text-gray-300">{event.time}-</span>

                <span className="ml-1 text-gray-300">{event.time}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <a
                target="_blank"
                className="flex items-center justify-center px-3 py-2 mx-5 border-2 border-secondary"
              >
                <CloseSharpIcon width={15} height={15} className="mr-2" />{" "}
                Cancel
              </a>
              <button
                type="button"
                className="flex items-center justify-center px-3 py-2 mx-5 border-2 border-secondary"
              >
                <AccessTimeRoundedIcon
                  width={15}
                  height={15}
                  className="mr-2"
                />
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
