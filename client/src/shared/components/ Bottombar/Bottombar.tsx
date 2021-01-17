import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import bottomBar from "../../../assets/images/bottom_bar.svg";

export default function Bottombar() {
  return (
    <div className=" relative w-full flex items-end z-10">
      <img
        className="align-end md:visible invisible w-full"
        src={bottomBar}
        alt="bottom bar"
      />
      <Unicons.UilFacebookF className="absolute fill-secondary cursor-pointer left-1/2 top-0 m-4 z-10" />
      <Unicons.UilInstagram className="absolute fill-secondary cursor-pointer  " />
      <Unicons.UilLinkedin className="absolute fill-secondary cursor-pointer  " />
    </div>
  );
}
