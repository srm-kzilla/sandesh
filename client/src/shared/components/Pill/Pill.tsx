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
    <button
      className={classNames(
        "kz-pill text-caption rounded-md uppercase  transition duration-100 ease-out p-2",
        {
          "!bg-tertiary !text-darkGray": props.theme !== "active",
          "!bg-primary !text-darkFont": props.theme === "active",
          "cursor-pointer": props.onClick !== undefined,
          "flex items-center justify-center": props.icon,
        },
        props.className
      )}
      onClick={props.onClick}
    >
      {props.icon}
      <span className={classNames({ "ml-2": props.icon })}>{props.label}</span>
    </button>
  );
};

export default Pill;
