import React, { useState, useEffect } from "react";
import axios from "axios";

type Props = {};

const Attendees = (props: Props) => {
  const [id, setId] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getAttendees = async () => {
      const response = await axios.get(`api/events`);
      //   setId(response.data[0].id);
      //   setName(response.data[0].name);
      //   setEmail(response.data[0].email);
      const data = response.data;
      //   data.map((n: any) => {
      //     setId(n.id);
      //     setName(n.name);
      //     setEmail(n.email);
      //   });

      console.log(data);
      setId(data);
    };

    getAttendees();
  }, []);

  return (
    <div className="h-screen p-20 bg-slate-100">
      <h3 className="mb-4 text-sm font-bold text-dark-300">Upcoming Events</h3>
      <p className="pb-8">
        The following are events that are available from the Users
      </p>
      {id.map((n: any) => {
        return (
          <div
            className="p-6 bg-white rounded-lg shadow-lg cursor-pointer"
            id={n.id}
          >
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Secret Meeting
            </h2>
            <p className="text-gray-700">{name}</p>
            <p className="text-gray-700">{email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Attendees;
