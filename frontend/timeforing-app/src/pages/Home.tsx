import { type Component } from "solid-js";

import styles from "./Home.module.css";
import { appState } from "../state/store"



const Home: Component = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "30vmax",
      }}
    >
      <p>{appState.user?.name}</p>
      <p>{appState.user?.email}</p>
      <img src={appState.user?.profile_picture} width={32} height={32} />
      <p>{appState.user?.user_id}</p>
    </div>
  );
};

export default Home;
