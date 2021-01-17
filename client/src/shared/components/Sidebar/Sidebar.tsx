import React from "react";
import "./Sidebar.scss";
import * as Unicons from "@iconscout/react-unicons";
import classNames from "classnames";
import { Assets } from "../../../constants";
import { useHistory, useLocation } from "react-router-dom";
import useDarkMode from "../../../hooks/useDarkMode";

const Sidebar = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="kz-sidebar h-screen py-4 ml-4 w-12 fixed ">
      <div className="w-full flex-col bg-primary h-full rounded-tr-xl rounded-bl-xl flex text-center justify-between py-4">
        <figure>
          <img
            src={Assets.LOGO_MONO_WHITE}
            className="w-1/2 m-auto cursor-pointer"
            alt="logo"
            onClick={() => {
              history.push("/");
            }}
          />
        </figure>
        <div className="flex items-center justify-center flex-col">
          <Unicons.UilDiary
            className={classNames("fill-secondary", "cursor-pointer", "mb-8", {
              active: location.pathname === "/sends",
            })}
            onClick={() => {
              history.push("/sends");
            }}
          />
          <Unicons.UilPodium
            className={classNames("fill-secondary", "mb-8", "cursor-pointer", {
              active: location.pathname === "/podium",
            })}
            onClick={() => {
              history.push("/podium");
            }}
          />
          <Unicons.UilKeySkeleton
            className={classNames("fill-secondary", "mb-8", "cursor-pointer", {
              active: location.pathname === "/keys",
            })}
            onClick={() => {
              history.push("/keys");
            }}
          />
          <Unicons.UilCloudMoon
            className={classNames("fill-secondary", "mb-0", "cursor-pointer", {
              active: location.pathname === "/keys",
            })}
            onClick={() => {
              setTheme(colorTheme);
            }}
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <Unicons.UilUserCircle
            className={classNames("fill-secondary", "mb-0", "cursor-pointer", {
              active: false,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
