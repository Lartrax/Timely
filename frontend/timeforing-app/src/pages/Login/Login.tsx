import { createEffect, type Component } from "solid-js";
import { signInGoogle, signInGuest } from "../../api/firebase";

import styles from "./Login.module.css";
import Button from "../../components/Button";
import { appState, page, setAppState } from "../../store/store";
import icon from "../../assets/favicon.png";

const Login: Component = () => {
  createEffect(() => {
    if (appState.user) {
      setAppState({ page: page.profile });
    }
  });

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "30vmax",
        height: "100vh",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <img class={styles.logo} src={icon} style={{ width: "40vmax" }} />
      <Button
        style={{ width: "20vmax" }}
        text={
          <>
            Login with&nbsp;
            <p class={styles.google} style={{ color: "#4285f4" }}>
              G
            </p>
            <p class={styles.google} style={{ color: "#ea4335" }}>
              o
            </p>
            <p class={styles.google} style={{ color: "#fbbc05" }}>
              o
            </p>
            <p class={styles.google} style={{ color: "#4285f4" }}>
              g
            </p>
            <p class={styles.google} style={{ color: "#34a853" }}>
              l
            </p>
            <p class={styles.google} style={{ color: "#ea4335" }}>
              e
            </p>
          </>
        }
        onClick={signInGoogle}
      />
      <Button
        style={{ width: "20vmax" }}
        text="Login as guest"
        onClick={signInGuest}
      />
    </div>
  );
};

export default Login;
