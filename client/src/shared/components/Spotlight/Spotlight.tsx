import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import "./Spotlight.scss";
import * as Unicons from "@iconscout/react-unicons";
import classNames from "classnames";
import { HotKeys } from "react-hotkeys";
import { v4 as uuid } from "uuid";
import SearchStore from "../../stores/SearchStore";
import { observer } from "mobx-react";

const Spotlight = () => {
  const [index, setIndex] = useState(-1);

  const input = useRef<any>();
  const hotKeys = useRef<any>();

  const searchStore = useContext(SearchStore);

  const keyMap = {
    UP: ["up"],
    DOWN: ["down"],
    ENTER: ["enter"],
  };

  useEffect(() => {
    if (searchStore.spotlight) {
      input.current.focus();
    }
  }, [searchStore.spotlight]);

  const handlers = {
    UP: React.useCallback(() => {
      console.log(index);
      if (index <= -1) return;
      setIndex(index - 1);
    }, [index]),
    DOWN: React.useCallback(() => {
      console.log(index);
      if (index >= items.length - 1) return;
      setIndex(index + 1);
    }, [index]),
    ENTER: React.useCallback(() => {
      alert("Enter " + index);
    }, [index]),
  };

  const items = [
    "Lorem Ipsum",
    "Color Green",
    "technical@srmkzilla.net",
    "ishan@srmkzilla.net",
    "Lorem Ipsum",
    "Color Green",
    "technical@srmkzilla.net",
    "ishan@srmkzilla.net",
  ];

  return searchStore.spotlight ? (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div
        className="kz-spotlight shadow-xl rounded-xl absolute top-1/2 left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 p-2 py-6 flex flex-col "
        ref={hotKeys}
      >
        <input
          type="text"
          className="bg-altGray h-10 rounded-md w-full px-3 outline-none flex-grow flex-shrink-0"
          placeholder="Search for email addresses, campaigns, tags..."
          onKeyUp={(e) => {
            if (e.key === "ArrowUp") handlers.UP();
            else if (e.key === "ArrowDown") {
              handlers.DOWN();
            } else if (e.key === "Enter") {
              handlers.ENTER();
            }
          }}
          ref={input}
        />
        <hr className="my-3 text-altGray" />
        <small className="text-caption uppercase">recent searches</small>
        <div className="overflow-y-scroll flex-grow">
          <div className="overflow-y-scroll flex-grow">
            {items.map((item, idx) => {
              return (
                <SpotlightItem key={idx} item={item} active={idx === index} />
              );
            })}
          </div>
        </div>
      </div>
    </HotKeys>
  ) : null;
};

interface ItemProps {
  active?: boolean;
  item: string;
}
const SpotlightItem = (props: ItemProps) => {
  return (
    <div
      className={classNames(
        "h-12 rounded-md mt-2 flex items-center justify-between px-3",
        { "bg-altGray": props.active }
      )}
    >
      <p>{props.item}</p>
      {props.active && <Unicons.UilEnter />}
    </div>
  );
};

export default observer(Spotlight);
