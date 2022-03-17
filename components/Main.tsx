import React from "react";
import Link from "next/link";

type Props = {};

const Booking = (props: Props) => {
  return (
    <section>
      <div className="float-left">
        <aside className="w-64" aria-label="Sidebar">
          <div className="h-full h-screen min-h-screen px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-blue-900">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  target="_blank"
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
            </ul>
          </div>
        </aside>
      </div>
      <Link href={"/mugisha-israel/secret"}>
        <div className="h-screen p-20 bg-slate-100">
          <h3 className="mb-4 text-sm font-bold text-dark-300">Event Types</h3>
          <p className="pb-8">
            Create events to share for people to book on your calendar.
          </p>
          <div className="p-6 bg-white rounded-lg shadow-lg cursor-pointer">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Secret Meeting
            </h2>
            <p className="text-gray-700">
              Use This Session to book a one on one with Me.
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Booking;
