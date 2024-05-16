import { For, type Component } from "solid-js";

import styles from "./Export.module.css";
import { appState } from "../../store/store";

const Export: Component = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "40vmax",
      }}
    >
      <p style={{ "font-size": "2em" }}>
        Week {appState.activeWorkWeek.week}, {appState.activeWorkWeek.year}
      </p>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "1em",
          border: "1px solid #eee",
          "border-radius": "1em",
          padding: "1em",
        }}
      >
        <For each={appState.activeWorkWeek.days}>
          {(day) => (
            <span
              style={{
                display: "flex",
                "flex-direction": "column",
                "text-align": "left",
                gap: "0.5em",
              }}
            >
              <p>{day.day}</p>

              <For each={day.codes}>
                {(code) => (
                  <span
                    style={{
                      display: "flex",
                      "justify-content": "space-around",
                      padding: "0.5em",
                      "border-radius": "1em",
                      background: "#fafafa",
                    }}
                  >
                    <p
                      style={{
                        "flex-grow": 1,
                        "flex-basis": 0,
                        "text-align": "left",
                        "padding-left": "1em",
                      }}
                    >
                      {code.code}
                    </p>
                    <div
                      style={{
                        "border-left": "1px solid #eee",
                        "padding-left": "1em",
                      }}
                    />
                    <p
                      style={{
                        "flex-grow": 2,
                        "flex-basis": 0,
                        "text-align": "left",
                      }}
                    >
                      {code.description}
                    </p>
                    <div
                      style={{
                        "border-right": "1px solid #eee",
                        "padding-left": "1em",
                      }}
                    />
                    <p
                      style={{
                        "flex-grow": 1,
                        "flex-basis": 0,
                        "text-align": "right",
                        "padding-right": "1em",
                      }}
                    >
                      {code.hours}h
                    </p>
                  </span>
                )}
              </For>
            </span>
          )}
        </For>
      </div>
    </div>
  );
};

export default Export;
