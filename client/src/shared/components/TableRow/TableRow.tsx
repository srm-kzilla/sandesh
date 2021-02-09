import classNames from "classnames";
import "./TableRow.scss";
import React, { useState } from "react";

interface Props {
  structure: (item: any) => JSX.Element[];
  item: any;
  index: any;
  full?: boolean;
  setFull?: any;
  onClick?: (id: any) => void;
  _id?: string;
  toShow?: string;
}

export default function TableRow(props: Props) {
  const [full, setFull] = useState(true);
  const item = props.item;
  const index = props.index;

  return (
    <>
      <React.Fragment key={index}>
        <tr
          key={index}
          className={classNames("my-4 text-2xl", {
            "cursor-pointer": props.onClick,
            "md:table-row hidden": !full,
          })}
          onClick={() => {
            props.onClick && props.onClick(props._id ? item[props._id] : index);
          }}
        >
          {props.structure(item).map((element, idx) => {
            return (
              <td
                key={idx}
                className="my-4 bg-altGray dark:bg-lighterGray px-4 py-4 md:table-cell table-row"
              >
                {element}
              </td>
            );
          })}
        </tr>
        <tr className="md:h-4 h-8">
          {item.toShow ? (
            <td
              className="cursor-pointer text-font text-xl italic font-extrabold block md:hidden"
              onClick={() => {
                setFull(!full);
              }}
            >
              {!full ? item.toShow : "Hide"}
            </td>
          ) : (
            ""
          )}
        </tr>
      </React.Fragment>
    </>
  );
}
