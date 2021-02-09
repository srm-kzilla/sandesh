import React from "react";
import "./TableView.scss";
import classNames from "classnames";
import TableRow from "../TableRow/TableRow";

interface Props {
  labels: string[];
  structure: (item: any) => JSX.Element[];
  items: any[];
  onClick?: (id: any) => void;
  _id?: string;
}
const TableView = (props: Props) => {
  return (
    <table className="table-auto h-full w-full mt-4 kz-table-view dark:bg-darkGray">
      <thead className="md:table-header-group hidden w-full">
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
      <tbody className="flex flex-col items-center md:table-row-group dark:bg-darkGray">
        {props.items.map((item, index) => {
          return (
            <TableRow
              key={index}
              item={item}
              index={index}
              structure={props.structure}
              toShow={item.toShow}
            />
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
