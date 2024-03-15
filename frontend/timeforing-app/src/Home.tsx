import { onMount, type Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

import styles from "./Home.module.css";
import Button from "./components/Button";
import { logger } from "./functions";

type redirect = {
  url: string;
};

type user = {
  userId: string;
  name: string;
  email: string;
  profilePicture: string;
};

const Home: Component = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const currentUrl = window.location.host;
    logger(currentUrl);
    const response = await fetch(
      `https://auth.larserik.space/generate_redirect/${currentUrl}`,
      { method: "GET" }
    )
      .then((response) => response.text())
      .then((response) => JSON.parse(response) as redirect);

    logger(response.url);
    logger(currentUrl);

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
      logger("user:" + JSON.stringify(user));
    } else {
      logger("No access token");
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
      <p class={styles.title}>Links to projects</p>
      <Button text="Word distance" onClick={() => navigate("/word-distance")} />
      <Button text="Prime numbers" onClick={() => navigate("/prime-numbers")} />
      <Button
        text="Sorting Algorithms"
        onClick={() => navigate("/sorting-algorithms")}
      />
      <Button text="API GUI" onClick={() => navigate("/api-gui")} />
      <Button text="Login with Google" onClick={handleLogin} />
      <Button text="Sign Out" onClick={() => logger("signing out")} />
      <Button text="Get url" onClick={() => logger(window.location.href)} />
    </div>
  );
};

export default Home;
