import { createEffect, type Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

import styles from "./Navbar.module.css";
import { appState, page, setAppState } from "../state/store";

const Navbar: Component = () => {
  const navigate = useNavigate();

  createEffect(() => {
    if (appState.user) {
      switch (appState.page) {
        case page.weekView:
          navigate("/week-view")
          break;
        case page.workTimer:
          navigate("/work-timer")
          break;
        case page.export:
          navigate("/export")
          break;
        case page.archive:
          navigate("/archive")
          break;
        case page.profile:
          navigate("/profile")
          break;
        default:
          navigate("week-view")
          break;
      }
    }

  })

  return (
    <div class={styles.navbar}>
      <span class={styles.divisor} />
      <div
        class={styles.navbarItem}
        style={{
          ...{ "font-size": "3em", "padding-bottom": "0.5rem", cursor: "pointer" },
          ...appState.page === page.weekView && { "padding-bottom": "2.5rem" }
        }}
        onClick={() => setAppState({ page: page.weekView })}>
        📆
      </div>
      <span class={styles.divisor} />
      <div
        class={styles.navbarItem}
        style={{
          ...{ "font-size": "3.5em", "padding-bottom": "0.5rem", cursor: "pointer" },
          ...appState.page === page.workTimer && { "padding-bottom": "2.5rem" }
        }}
        onClick={() => setAppState({ page: page.workTimer })}>
        ⏱️
      </div>
      <span class={styles.divisor} />
      <div
        class={styles.navbarItem}
        style={{
          ...{ "font-size": "3.5em", "padding-bottom": "0.5rem", cursor: "pointer" },
          ...appState.page === page.export && { "padding-bottom": "2.5rem" }
        }}
        onClick={() => setAppState({ page: page.export })}>
        📤
      </div>
      <span class={styles.divisor} />
      <div
        class={styles.navbarItem}
        style={{
          ...{ "font-size": "3.5em", "padding-bottom": "0.5rem", cursor: "pointer" },
          ...appState.page === page.archive && { "padding-bottom": "2.5rem" }
        }}
        onClick={() => setAppState({ page: page.archive })}>
        🗃️
      </div >
      <span class={styles.divisor} />
      <div
        class={styles.navbarItem}
        style={{
          ...{ "font-size": "4rem", "padding-bottom": "2rem", cursor: "pointer" },
          ...appState.page === page.profile && { "padding-bottom": "4rem" }
        }}
        onClick={() => setAppState({ page: page.profile })}>
        🪪
      </div>
      <span class={styles.divisor} />
    </div>
  );
};

export default Navbar;
