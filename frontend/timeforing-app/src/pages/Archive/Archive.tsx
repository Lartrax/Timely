import { createSignal, For, onMount, type Component } from "solid-js";

import styles from "./Archive.module.css";
import { appState } from "../../store/store";

type WeekYear = {
  week_year: string;
};

const Archive: Component = () => {
  const [allWeeks, setAllWeeks] = createSignal<WeekYear[]>();

  onMount(async () => {
    if (appState.user) {
      const allWeeks: WeekYear[] = await fetch(
        `https://database.larserik.space/work/${appState.user.user_id}`,
        {
          method: "GET",
        }
      ).then(async (res) => {
        if (res.status === 200) {
          return await res.json();
        }
      });
      setAllWeeks(allWeeks);
    }
  });

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "0.5em",
        width: "30vmax",
      }}
    >
      <p style={{ "font-size": "2em", "padding-bottom": "1em" }}>
        All your logged weeks
      </p>
      <For each={allWeeks()}>
        {(week) => {
          return (
            <span
              style={{
                padding: "0.5em",
                "border-radius": "1em",
                background: "#fafafa",
              }}
            >
              <p>
                {week.week_year.split("-")[0]}
                {", "}
                {week.week_year.split("-")[1]}
              </p>
            </span>
          );
        }}
      </For>
    </div>
  );
};

export default Archive;
