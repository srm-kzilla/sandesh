import React from "react";
import "./Pill.scss";
import classNames from "classnames";

interface Props {
  icon?: any;
  label?: string;
  className?: string;
  theme?: "normal" | "active";
  onClick?: () => void;
}
const Pill = (props: Props) => {
  return (
    <a
      className={classNames(
        "kz-pill text-caption py-1 px-1 rounded uppercase bg-tertiary transition duration-100 ease-out",
        {
          "!bg-primary !text-white": props.theme === "active",
          "cursor-pointer": props.onClick !== undefined,
          "flex items-center justify-center": props.icon,
        },
        props.className
      )}
      onClick={props.onClick}
    >
      {props.icon}
      <span className={classNames({ "ml-2": props.icon })}>{props.label}</span>
    </a>
  );
};

export default Pill;
