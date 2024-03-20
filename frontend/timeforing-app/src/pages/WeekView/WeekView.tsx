import { createEffect, createSignal, For, type Component } from "solid-js";

import styles from "./WeekView.module.css";
import Dropper from "../../components/Dropper";
import { appState, setAppState, WorkDay } from "../../state/store";
import { logger } from "../../functions";
import Button from "../../components/Button";
import { set } from "date-fns";

const WeekView: Component = () => {
  const [date, setDate] = createSignal({
    week: appState.activeWorkWeek?.week,
    year: appState.activeWorkWeek?.year,
  });
  const [workWeek, setWorkWeek] = createSignal<WorkDay[] | null>(
    appState.activeWorkWeek?.days || null
  );
  const [updateFailed, setUpdateFailed] = createSignal(false);

  const saveWeek = () => {
    fetch(`https://database.larserik.space/work/${appState.user?.user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        week: date().week,
        year: date().year,
        days: workWeek(),
      }),
    }).then((res) => {
      if (res.status === 200) {
        // Success update local state
        setUpdateFailed(false);
        setAppState({
          activeWorkWeek: {
            week: date().week,
            year: date().year,
            days: workWeek(),
          },
        });
        logger("Updated week: " + JSON.stringify(workWeek()));
      } else {
        // Failed
        setUpdateFailed(true);
      }
    });
  };

  createEffect(() => {
    logger("week: " + JSON.stringify(workWeek()));
  });

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "40vmax",
      }}
    >
      <p>Tabell Timeføring</p>
      <p>
        Uke {date().week} {date().year}
      </p>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "1em",
          "text-align": "left",
        }}
      >
        <div
          style={{ display: "flex", "flex-direction": "column", gap: "1em" }}
        >
          <For each={workWeek()}>
            {(workDay) => (
              <Dropper
                workDay={workDay}
                saveDay={(day) => {
                  setWorkWeek([
                    ...workWeek().map((workDay) =>
                      day.day === workDay.day ? { ...day } : workDay
                    ),
                  ]);
                  logger("week: " + JSON.stringify(workWeek()));
                }}
              />
            )}
          </For>
        </div>
      </div>
      <Button text="Lagre" onClick={() => saveWeek()} />
    </div>
  );
};

export default WeekView;
