import React from "react";
import * as Unicons from "@iconscout/react-unicons";
import bottomBar from "../../../assets/images/bottom_bar.svg";

export default function Footer() {
  return (
    <div className="relative w-full h-full flex  lg:bg-transparent">
      <img className="w-full" src={bottomBar} alt="bottom bar" />
      <Unicons.UilFacebookF className=" absolute fill-white cursor-pointer top-2 right-1/2 transform translate-x-1/2 z-10" />
      <Unicons.UilInstagram className=" absolute fill-white cursor-pointer md:mt-8 mt-4 top-2 lg:left-9/20 z-10 left-1/4" />
      <Unicons.UilLinkedin className=" absolute fill-white cursor-pointer md:mt-8 mt-4 top-2 lg:right-9/20 z-10 right-1/4" />
      <div className="absolute grid grid-cols-3 grid-rows-2 gap-2 w-full top-1/2 bg-primary p-4 lg:grid-rows-1 lg:grid-cols-5 justify-items-center mt-4 lg:pb-12 lg:mt-0">
        <div>
          <span className="text-tertiary text-xl font-bold mb-4">
            More about us
          </span>
          <br /> <a href="#">Everything SRMKZILLA</a>
          <br /> <a href="#">Events</a>
          <br /> <a href="#">Blog</a>
          <br /> <a href="#">Us from last year</a>
        </div>
        <div>
          <span className="text-tertiary text-xl font-bold mb-4">
            Related Information
          </span>
          <br /> <a href="#">Privacy</a>
          <br /> <a href="#">Helpdesk</a>
        </div>
        <div>
          <span className="text-tertiary text-xl font-bold mb-4">
            Workshops
          </span>
          <br /> <a href="#">Hacktoberfest’20</a>
          <br /> <a href="#">Recruitments’20</a>
          <br /> <a href="#">Unlocking</a>
          <br /> <a href="#">Linkedin</a>
        </div>
        <div className="max-w-2xl min-w-md col-span-3 lg:col-span-2 mb-8">
          <span className="text-tertiary text-xl font-bold mb-4">
            COMMUNITY
          </span>
          <br /> SRMKZILLA is proud to be an equal opportunity workplace. We are
          committed to equal volunteering opportunity regardless of race, color,
          ancestry, religion, sex, national origin, sexual orientation, age,
          citizenship, disability or gender identity.
        </div>
        <div className="italic text-tertiary absolute transform md:left-1/2 bottom-0 md:-translate-x-1/2">
          with your crazy friends on the SRMKZILLA team
        </div>
      </div>
    </div>
  );
}
