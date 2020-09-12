import React from "react";
import "./TextField.scss";
import { Label } from "..";
import classNames from "classnames";

interface Props {
  containerClassName?: string;
  className?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent) => void;
}
const TextField = (props: Props) => {
  return (
    <div
      className={classNames(
        "kz-text-field",
        "flex",
        "flex-col",
        props.containerClassName
      )}
    >
      <Label
        label="Enter a nickname"
        description="Culpa ullamco tempor officia qui. Ut sint et amet dolore voluptate laborum. Ea sit pariatur consectetur excepteur eiusmod eu excepteur duis. Ad incididunt amet Lorem eu voluptate irure excepteur ullamco eiusmod laborum aute elit eu magna. Consequat adipisicing adipisicing reprehenderit veniam do irure culpa. Consectetur velit adipisicing fugiat tempor."
      />
      <input
        className={classNames(
          "w-100",
          "border-2",
          "h-10",
          "p-2",
          "outline-none",
          "border-solid",
          "border-altGray",
          "rounded-md",
          props.className
        )}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextField;
