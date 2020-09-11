import React, { useState, useEffect } from "react";
import "./CircleButton.scss";
import classNames from "classnames";

interface Props {
  icon: JSX.Element;
  onClick?: () => void;
}
const CircleButton = (props: Props) => {
  return (
    <div
      className={classNames("relative", { "cursor-pointer": props.onClick })}
      onClick={props.onClick}
    >
      <div className="kz-circle-button animate-spin top-0 left-0 w-12 h-12 border border-primary rounded-full flex items-center justify-center border-dashed">
        <div className="kz-circle-button animate-spin w-8 h-8 border border-secondary rounded-full flex items-center justify-center border-dashed"></div>
      </div>
      <p className="absolute -translate-x-1/2 transform -translate-y-1/2 top-1/2 left-1/2">
        {props.icon}
      </p>
    </div>
  );
};

export default CircleButton;
