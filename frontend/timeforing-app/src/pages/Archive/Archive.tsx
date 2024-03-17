import { type Component } from "solid-js";

import styles from "./Archive.module.css";
import { appState } from "../../state/store"



const Archive: Component = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "30vmax",
      }}
    >
      <p>Historikk</p>
    </div>
  );
};

export default Archive;
