import { JSX, type Component } from "solid-js";

import styles from "./Button.module.css";

type buttonProps = {
  text: string;
  onClick?: () => void;
  style?: JSX.CSSProperties;
};

const Button: Component<buttonProps> = ({ text, onClick, style }) => {
  return (
    <span class={styles.button} style={style} onClick={onClick}>
      {text}
    </span>
  );
};

export default Button;
