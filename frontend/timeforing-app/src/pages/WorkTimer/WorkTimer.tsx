import { type Component } from "solid-js";

import styles from "./WorkTimer.module.css";

const WorkTimer: Component = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "30vmax",
      }}
    >
      <p>Stemplingsur</p>
    </div>
  );
};

export default WorkTimer;