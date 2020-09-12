import React from "react";
import "./Label.scss";
import classNames from "classnames";

interface Props {
  label?: string;
  description?: string;
}
const Label = (props: Props) => {
  return props.label ? (
    <>
      <label
        className={classNames(
          "mb-4",
          "color-secondary",
          "text-caption",
          "w-100",
          "uppercase",
          { "!mb-2": props.description }
        )}
      >
        {props.label}
      </label>
      {props.description && (
        <p className="mb-4 color-secondary text-caption w-100 !font-normal">
          {props.description}
        </p>
      )}
    </>
  ) : null;
};

export default Label;
