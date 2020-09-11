import React from "react";
import "./Keys.scss";
import {
  Sidebar,
  Pill,
  Spotlight,
  TableView,
  CircleButton,
} from "../../shared/components";
import * as Unicons from "@iconscout/react-unicons";
import { observer } from "mobx-react";
import { sentenceCase } from "change-case";
import { v4 as uuid } from "uuid";

type Category = "all" | "singles" | "campaigns";

const keyMap = {
  SLASH: ["/"],
};

const Keys = () => {
  const items = [
    {
      name: "prepared",
      _id: uuid(),
    },
    {
      name: "dumped",
      _id: uuid(),
    },
  ];

  const renderStructure = (item: any) => [
    <p className="flex items-center">{sentenceCase(item.name)}</p>,
    <div>
      <p>••••••••••••••••</p>
      <p className="text-caption mt-1 overflow-hidden transition-all duration-500 ease-in-out">
        {item.subject}
      </p>
    </div>,
    <p>Edit</p>,
  ];

  return (
    <div className="kz-keys">
      <Sidebar />
      <Spotlight />
      <div className="kz-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-title">Keys</h1>
          </div>
          <div>
            <CircleButton
              icon={<Unicons.UilPlus size={14} className="fill-primary" />}
              onClick={() => {
                alert("Clicked");
              }}
            />
          </div>
        </div>

        <TableView
          labels={["name", "api key"]}
          structure={renderStructure}
          items={items}
          onClick={(id) => {
            alert(id);
          }}
          _id={"_id"}
        />
      </div>
    </div>
  );
};

export default observer(Keys);
