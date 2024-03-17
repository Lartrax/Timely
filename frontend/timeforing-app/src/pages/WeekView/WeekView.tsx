import { type Component } from "solid-js";

import styles from "./WeekView.module.css";

const WeekView: Component = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "30vmax",
      }}
    >
      <p>Ukes Timeføring</p>
    </div>
  );
};

export default WeekView;
