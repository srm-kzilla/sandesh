import React, { useContext, useState } from "react";
import "./Keys.scss";
import {
  Sidebar,
  Pill,
  Spotlight,
  TableView,
  CircleButton,
  Drawer,
} from "../../shared/components";
import * as Unicons from "@iconscout/react-unicons";
import { observer } from "mobx-react";
import { sentenceCase } from "change-case";
import { v4 as uuid } from "uuid";
import { OverlayStore } from "../../shared/stores";
import { TextField, TextArea, Button } from "../../shared/components/Fields";
import TopBar from "../../shared/components/TopBar/TopBar";

const keyMap = {
  SLASH: ["/"],
};

const Keys = () => {
  const overlayStore = useContext(OverlayStore);

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
    <p className="flex items-center p-4 md:p-0">{sentenceCase(item.name)}</p>,
    <div className="p-4 md:p-0 w-75-vw md:w-full">
      <p>••••••••••••••••</p>
      <p className="text-caption mt-1 overflow-hidden transition-all duration-500 ease-in-out">
        {item.subject}
      </p>
    </div>,
    <p className="p-4 md:p-0">Edit</p>,
  ];

  return (
    <div className="h-screen kz-keys">
      <Spotlight />
      <div className="kz-container flex flex-wrap justify-between">
        <div className="flex w-full items-center justify-between md:flex-row flex-col">
          <TopBar page="Keys" />
          <div className="flex items-center justify-between">
            <div>
              <CircleButton
                icon={<Unicons.UilPlus size={14} className="fill-primary" />}
                onClick={() => {
                  overlayStore.setDrawer(true);
                }}
              />
            </div>
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
      <Drawer element={<NewKey />} />
    </div>
  );
};

const NewKey = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <h3 className="text-heading-2 mb-4">Create a new key</h3>

      <TextField
        containerClassName="mb-4"
        placeholder="Sunt officia aliquip occaecat ipsum aliqua."
      />
      <TextArea containerClassName="mb-8" />

      <label className="switch mb-8">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>

      <Button
        label="Hello"
        onClick={() => {
          setLoading(true);

          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }}
        loaderTheme={"white"}
        theme={"primary"}
        loading={loading}
        disabled={false}
        textTheme={"white"}
      ></Button>
    </div>
  );
};

export default observer(Keys);
