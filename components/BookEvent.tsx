import React, { useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import axios from "axios";

type Props = {};

const BookEvent = (props: Props) => {
  const router = useRouter();
  const { name, book } = router.query;
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [date2, setDate2] = React.useState<Date | null>(new Date());
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const { eventTypeId } = router.query;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const attendeeResponse = await axios.post(`/api/attendee`, {
        Email: Email,
        Name: Name,
        Date: date,
      });

      // const dateResponse = await axios.post(`/api/booking`, {
      //   StartDate: date,
      //   EndDate: date2,
      // });

      setName("");
      setEmail("");

      router.replace("/success");

      if (
        attendeeResponse.data.message == "Attendee Register Successfully"
        // &&
        // dateResponse.data.message == "Booked Reservation successfully"
      )
        alert("Attendee Register Successfully");
    } catch (error: any) {
      if (!error?.response) {
        alert("No Server Response");
      } else if (error.response?.status === 400) {
        alert("Invalid Email or Password");
      } else if (error.response?.status === 401) {
        alert("Unauthorized");
      } else {
        alert("Attendee Failed to Save Exists in Database");
      }
    }
  };

  return (
    <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10">
      <div className="container">
        <div className="flex flex-wrap -mx-4 lg:justify-between">
          <div className="w-full px-4 pl-20 lg:w-1/2 xl:w-6/12">
            <div className="max-w-[570px] mb-12 lg:mb-0">
              <span className="block mb-4 text-base font-semibold text-primary">
                {name}
              </span>
              <h2
                className="
                  text-dark
                  mb-6
                  uppercase
                  font-bold
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[36px]
                  xl:text-[40px]
                  "
              >
                {book} Meeting
              </h2>
              <p className="text-base leading-relaxed text-body-color mb-9">
                Use This Session to book a one on one with Me.
              </p>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="relative p-8 bg-white rounded-lg shadow-lg sm:p-12">
              <form onSubmit={handleSubmit}>
                <p className="pb-5 text-2xl font-semibold text-left ">
                  Attendee Information
                </p>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="
                        w-full
                        rounded
                        py-3
                        px-[14px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                        w-full
                        rounded
                        py-3
                        px-[14px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                  />
                </div>
                <div className="mb-6">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Choose the Start Date and Time"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full p-3 text-white transition bg-blue-800 border rounded border-primary hover:bg-opacity-90"
                  >
                    Book Event
                  </button>
                </div>
              </form>
              <div>
                <span className="absolute -top-10 -right-9 z-[-1]">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookEvent;
