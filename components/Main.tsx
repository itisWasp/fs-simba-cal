import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import requireAuthentication from "../HOC/requireAuthentication/index";

type Props = {};

const Booking = (props: Props) => {
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
    <section>
      <div className="float-left">
        <aside className="w-64" aria-label="Sidebar">
          <div className="h-full h-screen min-h-screen pt-20 overflow-y-auto px-50 bg-gray-50 dark:bg-blue-900">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Event Types
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Bookings
                  </span>
                </a>
              </li>

              <li>
                <div className="flex flex-wrap pt-60 place-items-end">
                  <div className="relative p-4 overflow-hidden bg-white shadow-lg rounded-xl w-72 md:w-96">
                    <a href="#" className="block w-full h-full">
                      <div className="flex items-center py-2 mb-2 border-b-2">
                        {/* <img className='object-cover w-10 h-10 rounded-full' alt='User avatar' src='https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200'> */}

                        <div className="pl-3">
                          <div className="font-medium">
                            {firstname.toLowerCase()}-{lastname.toLowerCase()}
                          </div>
                          {/* <div className="text-sm text-gray-600">
                        Sr. Forntend Developer
                      </div> */}
                        </div>
                      </div>
                      <div className="w-full h-2 bg-blue-200 rounded-full">
                        <div className="w-2/3 h-full text-xs text-center text-white bg-blue-600 rounded-full"></div>
                      </div>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="h-screen p-20 bg-slate-100">
        <h3 className="mb-4 text-sm font-bold text-dark-300">Event Types</h3>
        <p className="pb-8">
          Create events to share for people to book on your calendar.
        </p>
        <Link href={"/mugisha-israel/secret"}>
          <div className="p-6 bg-white rounded-lg shadow-lg cursor-pointer">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Secret Meeting
            </h2>
            <p className="text-gray-700">
              Use This Session to book a one on one with Me.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default requireAuthentication(Booking);
