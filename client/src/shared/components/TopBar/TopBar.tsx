import React, { useContext, useState, useCallback } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { Pill } from "..";
import { OverlayStore } from "../../stores";
import { HotKeys } from "react-hotkeys";

type Category = "all" | "singles" | "campaigns";
export default function TopBar(props?: any) {
  const [category, setCategory] = useState<Category>("all");
  const toggleCategory = (category: Category) => {
    setCategory(category);
  };
  const overlayStore = useContext(OverlayStore);
  const handleSlashPressed = React.useCallback(() => {
    overlayStore.setSpotlight(!overlayStore.spotlight);
  }, []);
  const keyMap = {
    SLASH: ["/"],
  };
  const handlers = {
    SLASH: handleSlashPressed,
  };
  return (
    <HotKeys keyMap={keyMap} handlers={handlers} className="outline-none">
      <div className="flex flex-col md:flex-row items-center justify-around md:w-75-vw ">
        <h1 className="text-title m-2">{props.page}</h1>
        <div className="flex gap-2 m-2 ">
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
            className="uppercase"
            onClick={() => {
              toggleCategory("singles");
            }}
          />
          <Pill
            label="Campaigns"
            theme={category === "campaigns" ? "active" : "normal"}
            className="uppercase"
            onClick={() => {
              toggleCategory("campaigns");
            }}
          />
        </div>
        <Pill
          label={"Filters"}
          theme={category === "all" ? "active" : "normal"}
          className="uppercase m-2"
          icon={<Unicons.UilFilter />}
          onClick={() => {
            toggleCategory("all");
          }}
        />
        <Pill
          label={'Search (Press "/" to focus)'}
          theme={"normal"}
          className="uppercase m-2"
          icon={<Unicons.UilSearch />}
          onClick={() => {
            overlayStore.setSpotlight(!overlayStore.spotlight);
          }}
        />
      </div>
    </HotKeys>
  );
}
