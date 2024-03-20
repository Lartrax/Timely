import { createEffect, createSignal, For, type Component } from "solid-js";

import styles from "./Dropper.module.css";
import InputField from "./InputField";
import { appState, HourCode, WorkDay } from "../state/store";
import IconButton from "./IconButton";
import { logger } from "../functions";

type dropperProps = {
  workDay: WorkDay;
  saveDay: (day: WorkDay) => void;
};

const Dropper: Component<dropperProps> = ({ workDay, saveDay }) => {
  const [showing, setShowing] = createSignal(false);

  const [day, setDay] = createSignal<WorkDay>(workDay);

  const getHours = (start: string, end: string): number => {
    const [sHours, sMinutes] = start.split(":").map((e) => parseInt(e));
    const [eHours, eMinutes] = end.split(":").map((e) => parseInt(e));

    const hours = eHours - sHours;
    const minutes = eMinutes / 60 - sMinutes / 60;

    return Math.round((hours + minutes) * 100) / 100;
  };

  return (
    <>
      <span class={styles.dropper} onClick={() => setShowing((prev) => !prev)}>
        <span>{day().day}</span>
        <span>
          {day().start} - {day().end}
        </span>
        <span>
          {day().codes.reduce((sum, c) => sum + c.hours, 0)}t /{" "}
          {getHours(day().start, day().end)}t
        </span>
        <IconButton
          style={{ "font-size": "1em" }}
          icon="💾"
          onClick={() => saveDay(day())}
        />
        <span
          style={{
            "transition-duration": "200ms",
            transform: showing() ? "rotateZ(-90deg)" : "rotateZ(0deg)",
          }}
        >
          {day().codes.reduce((sum, c) => sum + c.hours, 0) ===
          getHours(day().start, day().end)
            ? "◀"
            : "◁"}
        </span>
      </span>
      {showing() && (
        <div class={styles.dropDownItem}>
          <div
            style={{
              display: "flex",
              "justify-content": "space-between",
              "align-items": "flex-end",
            }}
          >
            <span style={{ "flex-grow": 1 }}>Code</span>
            <span style={{ "flex-grow": 0.5 }}>Description</span>
            <span style={{ "flex-grow": 1 }}>Time</span>
            <IconButton
              style={{ "font-size": "1em" }}
              icon="➕"
              onClick={() =>
                setDay({
                  ...day(),
                  codes: [
                    ...day().codes,
                    { code: "", description: "Work", hours: 0 } as HourCode,
                  ],
                })
              }
            />
          </div>
          <For each={day().codes}>
            {(hourCode, i) => (
              <div
                style={{
                  display: "flex",
                  "flex-direction": "column",
                }}
              >
                <div style={{ display: "flex", gap: "0.5em" }}>
                  <select
                    class={styles.list}
                    value={hourCode.code}
                    onChange={(e) =>
                      setDay({
                        ...day(),
                        codes: day().codes.map((code) =>
                          code === hourCode
                            ? { ...code, code: e.currentTarget.value || "" }
                            : code
                        ),
                      })
                    }
                  >
                    <For each={appState.preferences.time_codes}>
                      {(timeCode) => (
                        <option value={timeCode}>{timeCode}</option>
                      )}
                    </For>
                  </select>
                  <InputField
                    type="text"
                    value={hourCode.description}
                    onBlur={(e) =>
                      setDay({
                        ...day(),
                        codes: day().codes.map((code) =>
                          code === hourCode
                            ? {
                                ...code,
                                description: e.currentTarget.value || "",
                              }
                            : code
                        ),
                      })
                    }
                  />
                  <InputField
                    type="number"
                    value={hourCode.hours}
                    onBlur={(e) =>
                      setDay({
                        ...day(),
                        codes: day().codes.map((code) =>
                          code === hourCode
                            ? {
                                ...code,
                                hours: e.currentTarget.valueAsNumber || 0,
                              }
                            : code
                        ),
                      })
                    }
                    min={0}
                    max={getHours(day().start, day().end)}
                    step={0.25}
                  />
                  <IconButton
                    style={{ "font-size": "1em" }}
                    icon="❌"
                    onClick={() =>
                      setDay({
                        ...day(),
                        codes: day().codes.filter((_, j) => j !== i()),
                      })
                    }
                  />
                </div>
              </div>
            )}
          </For>
          <span style={{ display: "flex", gap: "1em" }}>
            <InputField
              type="time"
              value={day().start}
              onBlur={(e) =>
                setDay({
                  ...day(),
                  start: e.target.value,
                })
              }
            />
            <InputField
              type="time"
              value={day().end}
              onBlur={(e) =>
                setDay({
                  ...day(),
                  end: e.target.value,
                })
              }
            />
          </span>
        </div>
      )}
    </>
  );
};

export default Dropper;
