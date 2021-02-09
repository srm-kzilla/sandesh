import React, { useState } from "react";
import homeMail from "../../assets/images/home_mail.svg";
import map from "../../assets/images/map.svg";

import { Pill, Footer } from "../../shared/components/";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="kz-container grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 md:gap-x-16 md:gap-y-0 gap-y-16 justify-items-center items-center p-8 md:p-16 text-xl">
        <div className="md:h-screen col-span-1 flex flex-col justify-center">
          <div className="flex">
            <div className="w-2 h-12 mr-2 bg-tertiary "></div>
            <h1 className="text-primary text-title">
              The One Place to store your mails
            </h1>
          </div>
          <p className=" md:w-3/4 dark:text-darkFont">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Pill
            label={"Explore Dashboard"}
            theme={"active"}
            className="uppercase max-w-xs"
          />
        </div>
        <img className="col-span-1" alt="man-working" src={homeMail} />
        <div className="flex flex-col flex-wrap col-span-1 w-full p-3">
          <div className="flex">
            <div className="w-2 h-12 mr-2 bg-tertiary "></div>
            <h1 className="w-full text-primary text-title ">Let's Connect</h1>
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="h-16 md:w-9/12  m-1 p-2 rounded-lg bg-altGray dark:bg-lighterGray"
            ></input>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="h-16 md:w-9/12  m-1  rounded-lg bg-altGray dark:bg-lighterGray"
            ></input>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="h-32 md:w-9/12 m-1 p-2 rounded-lg bg-altGray dark:bg-lighterGray"
            ></textarea>
            <Pill
              label={"Submit"}
              theme={"active"}
              className="uppercase w-16 m-2 md:w-48"
            />
          </div>
        </div>
        <img className="p-2 md:ml-16" src={map} alt="map" />
      </div>
      <Footer />
    </>
  );
}
