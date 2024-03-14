import { type Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

import styles from "./Home.module.css";
import Button from "./components/Button";
import { logger } from "./functions";

const Home: Component = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://database.larserik.space/hello/google"
      );
      const { url } = await response.json();
      window.location.href = url; // Redirect to Google OAuth URL
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
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
