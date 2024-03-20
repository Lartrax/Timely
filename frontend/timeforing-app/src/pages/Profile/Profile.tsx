import { createEffect, createSignal, For, type Component } from "solid-js";

import styles from "./Profile.module.css";
import { appState, days, setAppState } from "../../state/store";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const Profile: Component = () => {
  const [startEndTimes, setStartEndTimes] = createSignal(
    appState.preferences.start_end_time
  );
  const [timeCodes, setTimeCodes] = createSignal(
    appState.preferences.time_codes
  );

  const updateStartEndTimes = () => {
    fetch(
      `https://database.larserik.space/preferences/${appState.user?.user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_end_time: startEndTimes(),
          time_codes: appState.preferences.time_codes,
        }),
      }
    ).then((res) => {
      if (res.status === 200) {
        // Success update local state
        setAppState({
          preferences: {
            start_end_time: startEndTimes(),
            time_codes: appState.preferences.time_codes,
          },
        });
      }
    });
  };

  const updateTimeCodes = () => {
    fetch(
      `https://database.larserik.space/preferences/${appState.user?.user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_end_time: appState.preferences.start_end_time,
          time_codes: timeCodes(),
        }),
      }
    ).then((res) => {
      if (res.status === 200) {
        // Success update local state
        setAppState({
          preferences: {
            start_end_time: appState.preferences.start_end_time,
            time_codes: timeCodes(),
          },
        });
      }
    });
  };

  createEffect(() => {
    setStartEndTimes(appState.preferences.start_end_time);
    setTimeCodes(appState.preferences.time_codes);
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "2em",
        "flex-direction": "column",
        "text-align": "left",
      }}
    >
      <span style={{ display: "flex", "flex-direction": "column", gap: "1em" }}>
        <p>Account</p>
        <div
          style={{
            display: "flex",
            gap: "1em",
            width: "30vmax",
            "text-align": "left",
            padding: "1em",
            border: "2px solid #eee",
            "border-radius": "1em",
          }}
        >
          <img src={appState.user?.profile_picture} width={48} height={48} />
          <span>
            <p>{appState.user?.name}</p>
            <p>{appState.user?.email}</p>
          </span>
        </div>
      </span>
      <span
        style={{ display: "flex", "flex-direction": "column", gap: "0.5em" }}
      >
        <p style={{ "padding-bottom": "0.5em" }}>Start and end times</p>
        <Button text="Save" onClick={() => updateStartEndTimes()} />
        <For each={startEndTimes()}>
          {(time, i) => (
            <div
              style={{
                display: "flex",
                "justify-content": "space-between",
                "align-items": "center",
              }}
            >
              <p>{days[i()].replace("day", "")}</p>
              <span style={{ display: "flex", gap: "1em" }}>
                <InputField
                  type="time"
                  value={time.start}
                  onBlur={(e) =>
                    setStartEndTimes(
                      startEndTimes().map((times, j) =>
                        i() === j
                          ? { start: e.target.value, end: times.end }
                          : times
                      )
                    )
                  }
                />
                <InputField
                  type="time"
                  value={time.end}
                  onBlur={(e) =>
                    setStartEndTimes(
                      startEndTimes().map((times, j) =>
                        i() === j
                          ? { start: times.start, end: e.target.value }
                          : times
                      )
                    )
                  }
                />
              </span>
            </div>
          )}
        </For>
      </span>
      <span style={{ display: "flex", "flex-direction": "column", gap: "1em" }}>
        <p>Timecodes</p>
        <span style={{ display: "flex", gap: "1em" }}>
          <Button
            style={{ "flex-grow": 1, "flex-basis": 0 }}
            text="New code"
            onClick={() => setTimeCodes(["", ...timeCodes()])}
          />
          <Button
            style={{ "flex-grow": 1, "flex-basis": 0 }}
            text="Save"
            onClick={() => updateTimeCodes()}
          />
        </span>
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            gap: "0.5em",
            width: "30vmax",
            "text-align": "left",
            padding: "1em",
            border: "2px solid #eee",
            "border-radius": "1em",
          }}
        >
          <For each={timeCodes()}>
            {(timeCode, i) => (
              <InputField
                style={{ width: "26vmax" }}
                type="text"
                value={timeCode}
                onBlur={(e) =>
                  setTimeCodes([
                    ...timeCodes().map((code, j) =>
                      i() === j ? e.target.value : code
                    ),
                  ])
                }
                placeholder="Workorder"
              />
            )}
          </For>
        </div>
      </span>
    </div>
  );
};

export default Profile;
