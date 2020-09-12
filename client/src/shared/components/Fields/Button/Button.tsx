import React from "react";
import "./Button.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface Props {
  link?: string;
  url?: string;
  onClick?: () => void;
  label?: string;
  icon?: any;
  theme: Theme;
  loaderTheme: Theme;
  textTheme: Theme;
  loading?: boolean;
  disabled?: boolean;
}
const Button = (props: Props) => {
  const classes = [
    "kz-button",
    "flex",
    "rounded-md",
    "h-12",
    `bg-${props.theme}`,
    `text-${props.textTheme}`,
    "items-center",
    "justify-center",
    "cursor-pointer",
    props.disabled ? "cursor-not-allowed pointer-events-none" : "",
  ];

  const render = () => {
    if (props.link) {
      return (
        <Link className={classNames(classes)} to={props.link}>
          {props.label}
        </Link>
      );
    } else if (props.url) {
      return (
        <a className={classNames(classes)} href={props.url}>
          {props.label}
        </a>
      );
    } else if (props.onClick) {
      return (
        <a className={classNames(classes)} onClick={props.onClick}>
          {props.label}
        </a>
      );
    } else return null;
  };
  return !props.loading ? (
    render()
  ) : (
    <a className={classNames(classes, "cursor-wait")}>
      <Loader theme={props.loaderTheme} />
    </a>
  );
};

type Theme =
  | "primary"
  | "secondary"
  | "tertiary"
  | "black"
  | "white"
  | "altGray";
interface LoaderProps {
  theme: Theme;
  className?: string;
}
const Loader = ({ theme, className }: LoaderProps) => {
  return (
    <div className={classNames("loader", className)}>
      <div className={classNames("line", `bg-${theme}`)}></div>
      <div className={classNames("line", `bg-${theme}`)}></div>
      <div className={classNames("line", `bg-${theme}`)}></div>
      <div className={classNames("line", `bg-${theme}`)}></div>
    </div>
  );
};

export default Button;
