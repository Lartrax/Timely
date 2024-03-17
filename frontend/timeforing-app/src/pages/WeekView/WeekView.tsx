import { type Component } from "solid-js";

import styles from "./WeekView.module.css";
import { appState } from "../../state/store"



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
