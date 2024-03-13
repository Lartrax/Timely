import { JSX, type Component } from "solid-js";

import Button from "./Button";

type buttonProps = {
  icon: string;
  onClick?: () => void;
  style?: JSX.CSSProperties;
};

const IconButton: Component<buttonProps> = ({ icon, onClick, style }) => {
  return (
    <Button
      text={icon}
      onClick={onClick}
      style={{
        height: "auto",
        "font-size": "1.5em",
        "font-weight": "350",
        "line-height": "1.5em",
        "padding-left": "0.5em",
        "padding-right": " 0.5em",
        ...style,
      }}
    />
  );
};

export default IconButton;
