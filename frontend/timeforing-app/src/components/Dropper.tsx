import { createEffect, createSignal, For, JSX, type Component } from "solid-js";

import styles from "./Dropper.module.css";
import InputField from "./InputField";
import { WorkDay } from "../state/store";
import { logger } from "../functions";

type dropperProps = {
  workDay: WorkDay;
};

const Dropper: Component<dropperProps> = ({ workDay }) => {
  const [showing, setShowing] = createSignal(true);

  const [day, setDay] = createSignal<WorkDay>(workDay);

  const getHours = (start: string, end: string): number => {
    const [sHours, sMinutes] = start.split(":").map((e) => parseInt(e));
    const [eHours, eMinutes] = end.split(":").map((e) => parseInt(e));

    const hours = eHours - sHours;
    const minutes = eMinutes / 60 - sMinutes / 60;

    return Math.round((hours + minutes) * 100) / 100;
  };

  createEffect(() => {
    logger(day().codes);
  });

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
        <span>{showing() ? "▲" : "▼"}</span>
      </span>
      {showing() && (
        <div class={styles.dropDownItem}>
          <div style={{ display: "flex", "justify-content": "space-between" }}>
            <span style={{ "flex-grow": 1 }}>Timekode</span>
            <span style={{ "flex-grow": 1 }}>Beskrivelse</span>
            <span style={{ "flex-grow": 1 }}>Tidsbruk</span>
          </div>
          <For each={day().codes}>
            {(hourCode, i) => (
              <div
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  gap: "0.5em",
                }}
              >
                <div style={{ display: "flex", gap: "0.5em" }}>
                  <InputField
                    type="text"
                    value={hourCode.code}
                    onBlur={(e) =>
                      setDay({
                        ...day(),
                        codes: day().codes.map((code) =>
                          code === hourCode
                            ? { ...code, code: e.currentTarget.value }
                            : code
                        ),
                      })
                    }
                    placeholder="Timekode"
                  />
                  <InputField
                    type="text"
                    value={hourCode.description}
                    onBlur={(e) =>
                      setDay({
                        ...day(),
                        codes: day().codes.map((code) =>
                          code === hourCode
                            ? { ...code, description: e.currentTarget.value }
                            : code
                        ),
                      })
                    }
                    placeholder="Beskrivelse"
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
                                hours: e.currentTarget.valueAsNumber,
                              }
                            : code
                        ),
                      })
                    }
                    placeholder="Tidsbruk"
                    min={0}
                    max={getHours(day().start, day().end)}
                    step={0.01}
                  />
                </div>
              </div>
            )}
          </For>
        </div>
      )}
    </>
  );
};

export default Dropper;
