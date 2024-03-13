import { createMemo, createSignal, type Component } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";

import styles from "./Navbar.module.css";

const Navbar: Component = () => {
  const [isHovered, setIsHovered] = createSignal(false);

  const location = useLocation();
  const navigate = useNavigate();

  const pathname = createMemo(() => {
    if (isHovered()) {
      return "Go home";
    }
    return location.pathname.replace("/", "/ ");
  });

  return (
    <div
      class={styles.navbar}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate("/")}
    >
      <p class={styles.url}>{pathname()}</p>
    </div>
  );
};

export default Navbar;
