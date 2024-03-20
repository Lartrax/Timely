import { createEffect, onMount, type Component } from "solid-js";

import styles from "./Login.module.css";
import Button from "../../components/Button";
import {
  appState,
  getWeekOrCreateNew,
  getPreferences,
  page,
  setAppState,
  type user,
} from "../../state/store";
import { getWeek, getYear } from "date-fns";

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
      const today = new Date();
      setAppState({
        activeWorkWeek: await getWeekOrCreateNew(
          getWeek(today) < 10
            ? "0" + getWeek(today)
            : getWeek(today).toString(),
          getYear(today).toString()
        ),
      });
      setAppState({ preferences: await getPreferences() });
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
