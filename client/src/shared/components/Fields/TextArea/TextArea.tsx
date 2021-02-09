import React from "react";
import "./TextArea.scss";
import { Label } from "..";
import classNames from "classnames";

interface Props {
  containerClassName?: string;
  className?: string;
  label?: string;
  description?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent) => void;
}
const TextArea = (props: Props) => {
  return (
    <div
      className={classNames(
        "kz-text-area dark:bg-darkGray dark:text-darkFont",
        "flex",
        "flex-col",
        props.containerClassName
      )}
    >
      <Label
        label="Enter a nickname"
        description="Culpa ullamco tempor officia qui. Ut sint et amet dolore voluptate laborum. Ea sit pariatur consectetur excepteur eiusmod eu excepteur duis. Ad incididunt amet Lorem eu voluptate irure excepteur ullamco eiusmod laborum aute elit eu magna. Consequat adipisicing adipisicing reprehenderit veniam do irure culpa. Consectetur velit adipisicing fugiat tempor."
      />
      <textarea
        className={classNames(
          "w-100",
          "border-2",
          "min-h-10",
          "p-2",
          "outline-none",
          "border-solid",
          "border-altGray",
          "rounded-md",
          "resize-none bg-darkGray",
          props.className
        )}
        rows={3}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
