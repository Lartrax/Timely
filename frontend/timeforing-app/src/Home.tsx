import { type Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

import styles from "./Home.module.css";
import Button from "./components/Button";
import { logger } from "./functions";

type redirect = {
  url: string;
};

const Home: Component = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    let currentUrl = window.location.host;
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
    </div>
  );
};

export default Home;
