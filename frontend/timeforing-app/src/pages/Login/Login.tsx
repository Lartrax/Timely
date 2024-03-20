import { createEffect, onMount, type Component } from "solid-js";

import styles from "./Login.module.css";
import Button from "../../components/Button";
import { logger } from "../../functions";
import {
  appState,
  getCurrentWeekOrCreateNew,
  getPreferences,
  page,
  setAppState,
  type user,
} from "../../state/store";

type redirect = {
  url: string;
};

const Login: Component = () => {
  const handleLogin = async () => {
    const response = await fetch(
      `https://auth.larserik.space/generate_redirect/proxy.larserik.space`,
      { method: "GET" }
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response) as redirect);

    const url = response.url;

    window.location.href = url; // Redirect to Google OAuth URL
  };

  // TODO: Move to api folder/file
  const createUser = (user: user) => {
    fetch(
      `https://database.larserik.space/user/${user.user_id}/${user.name}/${user.email}`,
      {
        method: "POST",
      }
    );
  };

  // Initialize user and current work week
  onMount(async () => {
    const url = window.location.href;
    const access_token = url.split("access_token=")[1].split("&")[0];

    if (access_token) {
      const user = await fetch(
        `https://auth.larserik.space/get_user/${access_token}`,
        { method: "GET" }
      )
        .then((response) => response.text())
        .then((user) => JSON.parse(user) as user);
      setAppState({ user: user });
      setAppState({
        activeWorkWeek: await getCurrentWeekOrCreateNew(),
        preferences: await getPreferences(),
      });
      createUser(user);
    }
  });

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
      }}
    >
      <Button
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
        onClick={handleLogin}
      />
    </div>
  );
};

export default Login;
