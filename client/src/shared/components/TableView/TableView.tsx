import React from "react";
import "./TableView.scss";
import classNames from "classnames";

interface Props {
  labels: string[];
  structure: (item: any) => JSX.Element[];
  items: any[];
  onClick?: (id: any) => void;
  _id?: string;
}
const TableView = (props: Props) => {
  return (
    <table className="table-auto w-full mt-4 kz-table-view">
      <thead>
        <tr className="text-left">
          {props.labels?.map((label, index) => {
            return (
              <th key={index} className="px-4 py-2 text-caption uppercase">
                {label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <tr
                className={classNames("my-4", {
                  "cursor-pointer": props.onClick,
                })}
                onClick={() => {
                  props.onClick &&
                    props.onClick(props._id ? item[props._id] : index);
                }}
              >
                {props.structure(item).map((element, idx) => {
                  return (
                    <td key={idx} className="my-4 bg-altGray px-4 py-4">
                      {element}
                    </td>
                  );
                })}
              </tr>
              <tr className="h-4"></tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableView;

{
  /*
  <TableView
  labels={["name", "class"]}
  structure={(item: any) => [<p>{item.name}</p>, <p>{item.class}</p>]}
  items={[
    {
      name: "Ishan",
      class: "A",
    },
    {
      name: "Am",
      class: "B",
    },
    {
      name: "Ds",
      class: "C",
    },
    {
      name: "Ea",
      class: "D",
    },
  ]}
/>; 
*/
}
