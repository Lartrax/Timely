import { type Component } from "solid-js";

import styles from "./Export.module.css";

const Export: Component = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "30vmax",
      }}
    >
      <p>Eksporter til agresso</p>
    </div>
  );
};

export default Export;
