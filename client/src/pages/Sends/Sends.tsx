import React, { useState } from "react";
import "./Sends.scss";
import { Sidebar, Pill } from "../../shared/components";
import * as Unicons from "@iconscout/react-unicons";
import { HotKeys } from "react-hotkeys";

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
    alert("Pocket");
  }, []);

  const handlers = {
    SLASH: handleSlashPressed,
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers} className="outline-none">
      <div className="kz-sends">
        <Sidebar />
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
                    handleSlashPressed();
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
                  toggleCategory("all");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </HotKeys>
  );
};

export default Sends;
