import { createEffect, onMount, type Component } from "solid-js";

import styles from "./Login.module.css";
import Button from "../../components/Button";
import { logger } from "../../functions";
import { appState, page, setAppState, type user } from "../../state/store"

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

    logger(response.url);

    const url = response.url;

    window.location.href = url; // Redirect to Google OAuth URL
  };

  onMount(async () => {
    const url = window.location.href;
    const access_token = url.split("access_token=")[1].split("&")[0];

    if (access_token) {
      logger("Access token: " + access_token);
      const user = await fetch(
        `https://auth.larserik.space/get_user/${access_token}`,
        { method: "GET" }
      )
        .then((response) => response.text())
        .then((user) => JSON.parse(user) as user);
      setAppState({ user: user });
      logger("user:" + JSON.stringify(user));
    } else {
      logger("No access token");
    }
  });

  createEffect(() => {
    if (appState.user) {
      setAppState({ page: page.profile })
    }
  })

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "30vmax",
      }}
    >
      <Button text="Login with Google" onClick={handleLogin} />
    </div>
  );
};

export default Login;
