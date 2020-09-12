import React, { useState, useContext } from "react";
import "./Sends.scss";
import { Sidebar, Pill, Spotlight, TableView } from "../../shared/components";
import * as Unicons from "@iconscout/react-unicons";
import { HotKeys } from "react-hotkeys";
import { OverlayStore } from "../../shared/stores";
import { observer } from "mobx-react";
import { sentenceCase } from "change-case";

type Category = "all" | "singles" | "campaigns";

const keyMap = {
  SLASH: ["/"],
};

const Sends = () => {
  const [category, setCategory] = useState<Category>("all");
  const toggleCategory = (category: Category) => {
    setCategory(category);
  };

  const handleSlashPressed = React.useCallback(() => {
    overlayStore.setSpotlight(!overlayStore.spotlight);
  }, []);

  const handlers = {
    SLASH: handleSlashPressed,
  };

  const overlayStore = useContext(OverlayStore);

  const [isCompact, setIsCompact] = useState(false);

  const items = [
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
        return <Unicons.UilExclamationCircle size={14} />;
      case "dumped":
        return <Unicons.UilPackage size={14} />;
      case "ricocheted":
        return <Unicons.UilDirections size={14} />;
      case "delivered":
        return <Unicons.UilMailboxAlt size={14} />;
      case "opened":
        return <Unicons.UilInbox size={14} />;
      case "clicked":
        return <Unicons.UilExternalLinkAlt size={14} />;
      case "unsubscribed":
        return <Unicons.UilTimesCircle size={14} />;
    }
  };

  const renderStructure = (item: any) => [
    <p className="flex items-center">
      {getIcon(item.status)}{" "}
      <span className="ml-2">{sentenceCase(item.status)}</span>
    </p>,
    <div>
      <p>{item.email}</p>{" "}
      <p
        className="text-caption mt-1 overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isCompact ? "0" : "56px" }}
      >
        {item.subject}
      </p>
    </div>,
    <p>{item.campaign}</p>,
    <p>{item.opens}</p>,
    <p>{item.clicks}</p>,
  ];

  return (
    <HotKeys keyMap={keyMap} handlers={handlers} className="outline-none">
      <div className="kz-sends">
        <Sidebar />
        <Spotlight />
        <div className="kz-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-title">Sends</h1>
              <div className="ml-16">
                <Pill
                  label="All"
                  theme={category === "all" ? "active" : "normal"}
                  className="uppercase"
                  onClick={() => {
                    toggleCategory("all");
                  }}
                />
                <Pill
                  label="Singles"
                  theme={category === "singles" ? "active" : "normal"}
                  className="ml-4 uppercase"
                  onClick={() => {
                    toggleCategory("singles");
                  }}
                />
                <Pill
                  label="Campaigns"
                  theme={category === "campaigns" ? "active" : "normal"}
                  className="ml-4 uppercase"
                  onClick={() => {
                    toggleCategory("campaigns");
                  }}
                />
              </div>
              <div className="ml-16">
                <Pill
                  label={"Filters"}
                  theme={category === "all" ? "active" : "normal"}
                  className="uppercase"
                  icon={<Unicons.UilFilter />}
                  onClick={() => {
                    toggleCategory("all");
                  }}
                />
              </div>
              <div className="ml-16">
                <Pill
                  label={'Search (Press "/" to focus)'}
                  theme={"normal"}
                  className="uppercase"
                  icon={<Unicons.UilSearch />}
                  onClick={() => {
                    overlayStore.setSpotlight(!overlayStore.spotlight);
                  }}
                />
              </div>
            </div>
            <div>
              <Pill
                label="All"
                theme={category === "all" ? "active" : "normal"}
                className="uppercase"
                onClick={() => {
                  setIsCompact(!isCompact);
                }}
              />
            </div>
          </div>

          <TableView
            labels={["status", "email", "campaign", "opens", "clicks"]}
            structure={renderStructure}
            items={items}
            onClick={(id) => {
              alert(id);
            }}
          />
        </div>
      </div>
    </HotKeys>
  );
};

export default observer(Sends);
