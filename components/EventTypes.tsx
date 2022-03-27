import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

type Props = {};

const Attendees = (props: Props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    const config: any = {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };
    const getProfile = async () => {
      const response = await axios.get(`/api/profile`, config);

      console.log(response.data);
      setFirstname(response.data.FirstName);
      setLastname(response.data.LastName);
    };

    getProfile();
  }, []);

  return (
    <div className="h-screen p-20 bg-slate-100">
      <h3 className="mb-4 text-sm font-bold text-dark-300">Event Types</h3>
      <p className="pb-8">
        Create events to share for people to book on your calendar.
      </p>
      <Link href={`/${firstname}-${lastname}/secret`}>
        <a target="_blank">
          <div className="p-6 bg-white rounded-lg shadow-lg cursor-pointer">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Secret Meeting
            </h2>
            <p className="text-gray-700">
              Use This Session to book a one on one with Me.
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Attendees;
