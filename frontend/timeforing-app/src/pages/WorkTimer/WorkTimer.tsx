import {
  createEffect,
  createMemo,
  createSignal,
  For,
  type Component,
} from "solid-js";

import styles from "./WorkTimer.module.css";
import Button from "../../components/Button";
import {
  ActiveWorkWeek,
  appState,
  getWeekOrCreateNew,
  setAppState,
} from "../../state/store";
import { getDay, getWeek, getYear } from "date-fns";
import IconButton from "../../components/IconButton";

const today = new Date();
const startWorkWeek = appState.user
  ? await getWeekOrCreateNew(getWeek(today), getYear(today))
  : { days: [] };

const WorkTimer: Component = () => {
  const [time, setTime] = createSignal(2000);
  const [workWeek, setWorkWeek] = createSignal(startWorkWeek);
  const [workDay, setWorkDay] = createSignal(
    workWeek()?.days[getDay(today) - 1]
  );
  const [updateFailed, setUpdateFailed] = createSignal(false);

  const refreshWorkWeek = async () => {
    setWorkWeek(await getWeekOrCreateNew(getWeek(today), getYear(today)));
    setWorkDay(workWeek()?.days[getDay(today) - 1]);
  };

  // If the current week is updated in tabe tool we update work timer
  createEffect(() => {
    if (appState.activeWorkWeek.week === getWeek(today).toString()) {
      refreshWorkWeek();
    }
  });

  let timer = 0;

  const startTimer = () => {
    timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const hours = createMemo(() => {
    return Math.floor(time() / 60 / 60);
  });
  const minutes = createMemo(() => {
    return Math.floor(time() / 60) - hours() * 60;
  });
  const seconds = createMemo(() => {
    return Math.floor(time()) - hours() * 60 * 60 - minutes() * 60;
  });

  const getHoursFromTimer = () => {
    return (
      Math.round((hours() + minutes() / 60 + seconds() / 3600) * 100) / 100
    );
  };

  const saveDay = () => {
    const newWorkWeek = {
      week: getWeek(today).toString(),
      year: getYear(today).toString(),
      days: [
        ...workWeek().days.map((day) =>
          day.day === workDay().day ? workDay() : day
        ),
      ],
    };
    fetch(`https://database.larserik.space/work/${appState.user?.user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkWeek),
    }).then((res) => {
      if (res.status === 200) {
        // Success update local state
        setUpdateFailed(false);
        // If the active week in table tool is the same then update it
        if (appState.activeWorkWeek.week === getWeek(today).toString()) {
          setAppState({
            activeWorkWeek: {
              week: getWeek(today).toString(),
              year: getYear(today).toString(),
              days: newWorkWeek.days,
            },
          });
        }
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
      <p style={{ "font-size": "2em" }}>{workDay()?.day}</p>
      <p>Week {getWeek(today)}</p>
      <h1
        style={{
          "font-size": "4em",
          "font-weight": "100",
          "font-variant-numeric": "tabular-nums",
        }}
      >
        {hours().toString().padStart(2, "0")} :{" "}
        {minutes().toString().padStart(2, "0")} :{" "}
        {seconds().toString().padStart(2, "0")}
      </h1>
      <span
        style={{ display: "flex", "justify-content": "center", gap: "1em" }}
      >
        <Button
          style={{ "flex-grow": 1, "flex-basis": 0 }}
          text="Start working"
          onClick={() => startTimer()}
        />
        <Button
          style={{ "flex-grow": 1, "flex-basis": 0 }}
          text="Stop working"
          onClick={() => stopTimer()}
        />
      </span>
      <span>
        <span
          style={{
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center",
          }}
        >
          <p style={{ "text-align": "left", padding: "1em" }}>
            Work orders for today
          </p>
          <IconButton
            style={{ "font-size": "1.5em" }}
            icon="🔃"
            onClick={() => refreshWorkWeek()}
          />
        </span>
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            padding: "1em",
            border: "1px solid #eee",
            "border-radius": "1em",
            gap: "0.5em",
          }}
        >
          <For each={workDay()?.codes}>
            {(code, i) => (
              <div
                style={{
                  display: "flex",
                  "justify-content": "space-between",
                  "align-items": "center",
                  "border-bottom": "1px solid #eee",
                  padding: "0.5em",
                  "padding-top": 0,
                }}
              >
                <p
                  style={{
                    "flex-grow": 1,
                    "flex-basis": 0,
                    "text-align": "left",
                    "padding-right": "1em",
                  }}
                >
                  {code.code}
                </p>
                <p
                  style={{
                    "flex-grow": 2,
                    "flex-basis": 0,
                    "text-align": "left",
                  }}
                >
                  {code.description}
                </p>
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
                <IconButton
                  style={{ "font-size": "1em" }}
                  icon="+ ⌛"
                  onClick={() =>
                    setWorkDay({
                      ...workDay(),
                      codes: workDay().codes.map((hourCode) =>
                        code === hourCode
                          ? {
                              ...hourCode,
                              hours: hourCode.hours + getHoursFromTimer(),
                            }
                          : hourCode
                      ),
                    })
                  }
                />
              </div>
            )}
          </For>
        </div>
      </span>
      {updateFailed() && <p style={{ color: "#f00" }}>Failed to save</p>}
      <Button text="Save" onClick={() => saveDay()} />
    </div>
  );
};

export default WorkTimer;
