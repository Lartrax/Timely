import { Component, JSX } from "solid-js";

import styles from "./InputField.module.css";

const InputField: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input class={styles.input} {...props} />;
};

export default InputField;
