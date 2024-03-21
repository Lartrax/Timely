import { createSignal, For, type Component } from "solid-js";

import styles from "./WeekView.module.css";
import Dropper from "../../components/Dropper";
import {
  appState,
  getWeekOrCreateNew,
  setAppState,
  WorkDay,
} from "../../state/store";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

const WeekView: Component = () => {
  const [date, setDate] = createSignal({
    week: appState.activeWorkWeek?.week,
    year: appState.activeWorkWeek?.year,
  });
  const [workWeek, setWorkWeek] = createSignal<WorkDay[]>(
    appState.activeWorkWeek.days
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
      } else {
        // Failed
        setUpdateFailed(true);
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2em",
        width: "40vmax",
      }}
    >
      <InputField
        style={{ width: "30vmax" }}
        type="week"
        value={`${date().year.toString()}-W${date()
          .week.toString()
          .padStart(2, "0")}`}
        onChange={async (e) => {
          const [stringYear, stringWeek] = e.target.value.split("-W");
          const year = parseInt(stringYear);
          const week = parseInt(stringWeek);
          setDate({ week: stringWeek, year: stringYear });
          setWorkWeek((await getWeekOrCreateNew(week, year)).days);
        }}
      />
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "1em",
          "text-align": "left",
        }}
      >
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            gap: "1em",
          }}
        >
          <For each={workWeek()}>
            {(workDay) => (
              <Dropper
                workDay={workDay}
                saveDay={(day) => {
                  setWorkWeek(
                    workWeek().map((workDay) =>
                      day.day === workDay.day ? { ...day } : workDay
                    )
                  );
                }}
              />
            )}
          </For>
        </div>
      </div>
      {updateFailed() && <p style={{ color: "#f00" }}>Failed to save</p>}
      <Button text="Save" onClick={() => saveWeek()} />
    </div>
  );
};

export default WeekView;
