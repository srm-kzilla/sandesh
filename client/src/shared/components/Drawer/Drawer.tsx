import React, { useContext } from "react";
import "./Drawer.scss";
import { OverlayStore } from "../../stores";
import { observer } from "mobx-react";
import classNames from "classnames";

interface Props {
  element: JSX.Element;
  containerClassName?: string;
  className?: string;
}

const Drawer = (props: Props) => {
  const overlayStore = useContext(OverlayStore);
  return overlayStore.drawer ? (
    <div
      className={classNames(
        "kz-drawer ",
        "h-screen",
        "absolute",
        "inset-0",
        "bg-secondary",
        "bg-opacity-50 dark:bg-lighterGray dark:text-darkFont",
        "flex",
        props.containerClassName
      )}
      onClick={() => {
        overlayStore.setDrawer(false);
      }}
    >
      <div
        className={classNames(
          "drawer",
          "w-screen-1/2",
          "h-screen",
          "right-0",
          "absolute",
          "top-0",
          "bg-white",
          "shadow-xl",
          "p-12",
          "overflow-auto dark:bg-darkGray",
          props.className
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.element}
      </div>
    </div>
  ) : null;
};

export default observer(Drawer);
