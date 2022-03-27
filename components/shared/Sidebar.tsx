import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import BackpackRoundedIcon from "@mui/icons-material/BackpackRounded";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";

import ListItem from "../reusable/ListItem";

const Sidebar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
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

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <div className="h-screen w-[20%] border-r-2 border-secondary flex flex-col justify-between items-start bg-white">
      <div className="flex flex-col justify-around w-full">
        <span className="mx-2 my-3 text-base font-bold cursor-pointer">
          Cal.com
        </span>
        <div className="mx-5">
          <ul className="w-full">
            <ListItem
              url="/"
              imageUrl={
                <AttachmentOutlinedIcon
                  width={20}
                  height={20}
                  className="-rotate-45"
                />
              }
              title="Event Types"
            />
            <ListItem
              url="/events"
              imageUrl={<BackpackRoundedIcon width={20} height={20} />}
              title="Bookings"
            />
            <ListItem
              url="#"
              imageUrl={<AccessTimeRoundedIcon width={20} height={20} />}
              title="Availability"
            />
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        {isLoggingOut && (
          <button
            className="w-[80%] px-3 py-2 bg-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        <div
          className="w-[80%] cursor-pointer hover:bg-secondary mx-auto mb-5 rounded  py-3  flex flex-row items-center justify-between px-3"
          onClick={() => setIsLoggingOut(!isLoggingOut)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer">
            <AccountCircleRoundedIcon
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-[50%]">
            <span className="text-xs">
              {firstname}-{lastname}
            </span>
            <span className="text-xs">
              cal.com/{firstname}-{lastname}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <KeyboardArrowUpRoundedIcon
              width={12}
              height={12}
              className="cursor-pointer"
            />
            <KeyboardArrowDownRoundedIcon
              width={12}
              height={12}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
