import React, { useState, useContext } from "react";
import "./Sends.scss";
import { Pill, Sidebar, Spotlight, TableView } from "../../shared/components";
import * as Unicons from "@iconscout/react-unicons";

// import { OverlayStore } from "../../shared/stores";
import { observer } from "mobx-react";
import { sentenceCase } from "change-case";
import TopBar from "../../shared/components/TopBar/TopBar";

type Category = "all" | "singles" | "campaigns";

const Sends = () => {
  const [isCompact, setIsCompact] = useState(false);
  // const [full, setFull] = useState(false);
  let items: any = [
    {
      status: "prepared",
      email: "ishan@srmkzilla.net",
      subject: "[ANNOUNCEMENT] I am going to sue you",
      campaign: "The Recruitments Campaign",
      opens: 5,
      clicks: 3,
    },
    {
      status: "dumped",
      email: "technical@srmkzilla.net",
      subject: "[ANNOUNCEMENT] No",
      campaign: "The Recruitments Campaign",
      opens: 2,
      clicks: 1,
    },
    {
      status: "delivered",
      email: "technical@srmkzilla.net",
      subject: "[RESULT] Steve",
      campaign: "The NGO Campaign",
      opens: 21,
      clicks: 6,
    },
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case "prepared":
        return <Unicons.UilExclamationCircle size={18} />;
      case "dumped":
        return <Unicons.UilPackage size={18} />;
      case "ricocheted":
        return <Unicons.UilDirections size={18} />;
      case "delivered":
        return <Unicons.UilMailboxAlt size={18} />;
      case "opened":
        return <Unicons.UilInbox size={18} />;
      case "clicked":
        return <Unicons.UilExternalLinkAlt size={18} />;
      case "unsubscribed":
        return <Unicons.UilTimesCircle size={18} />;
    }
  };

  const renderStructure = (item: any) => [
    <p className="flex items-center p-4 md:p-0 w-75-vw md:w-full">
      {getIcon(item.status)}
      <span className="md:hidden ml-2 font-bold underline">Status: </span>
      &ensp;
      <span className="">{sentenceCase(item.status)}</span>
    </p>,
    <div className="p-4 md:p-0">
      <p>
        <span className="md:hidden font-bold underline">Email: </span>
        &ensp;
        {item.email}
      </p>
      <p
        className="text-caption mt-1 overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isCompact ? "0" : "56px" }}
      >
        {item.subject}
      </p>
    </div>,

    <p className="p-4 md:p-0">
      <span className="md:hidden font-bold underline">Campaign: </span>
      &ensp;
      {item.campaign}
    </p>,
    <p className="p-4 md:p-0">
      <span className="md:hidden font-bold underline">Opens: </span>
      &ensp;
      {item.opens}
    </p>,
    <p className="p-4 md:p-0">
      <span className="md:hidden font-bold underline">Clicks: </span>
      &ensp;
      {item.clicks}
    </p>,
  ];

  items.map((item: any) => (item.toShow = item.campaign));

  return (
    <div className="kz-sends min-h-screen">
      <Sidebar />
      <Spotlight />
      <div className="kz-container">
        <div className="flex w-full items-center justify-between md:flex-row flex-col">
          <TopBar page="Sends" />
          <Pill
            label="All"
            theme={!isCompact ? "active" : "normal"}
            className="uppercase h-full m-2 w-32"
            onClick={() => {
              setIsCompact(!isCompact);
            }}
          />
        </div>
        <TableView
          labels={["status", "email", "campaign", "opens", "clicks"]}
          structure={renderStructure}
          items={items}
          // onClick={(id) => {
          //   alert(id);
          // }}
        />
      </div>
    </div>
  );
};

export default observer(Sends);
