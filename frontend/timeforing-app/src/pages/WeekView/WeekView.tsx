import { createSignal, For, type Component } from "solid-js";

import styles from "./WeekView.module.css";
import { getWeek, getYear } from "date-fns";
import InputField from "../../components/InputField";
import Dropper from "../../components/Dropper";
import { WorkWeek } from "../../state/store";
import { logger } from "../../functions";
import Button from "../../components/Button";

const WeekView: Component = () => {
  const today = new Date();

  const [date, setDate] = createSignal({
    week: getWeek(today),
    year: getYear(today),
  });

  const [workWeek, setWorkWeek] = createSignal<WorkWeek>([
    {
      day: "Mandag",
      codes: [
        {
          code: "60190-04",
          description: "Prøve",
          hours: 4,
        },
        {
          code: "60190-01",
          description: "Rapport",
          hours: 3.5,
        },
      ],
      start: "08:00",
      end: "15:30",
    },
    {
      day: "Tirsdag",
      codes: [],
      start: "08:00",
      end: "15:30",
    },
    {
      day: "Onsdag",
      codes: [],
      start: "08:00",
      end: "15:30",
    },
    {
      day: "Torsdag",
      codes: [],
      start: "08:00",
      end: "15:30",
    },
    {
      day: "Fredag",
      codes: [],
      start: "08:00",
      end: "15:30",
    },
    {
      day: "Lørdag",
      codes: [],
      start: "08:00",
      end: "15:30",
    },
    {
      day: "Søndag",
      codes: [],
      start: "08:00",
      end: "15:30",
    },
  ]);

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
                  setWorkWeek({
                    ...workWeek().map((workDay) =>
                      day.day === workDay.day ? { ...day } : workDay
                    ),
                  });
                  logger("week: " + JSON.stringify(workWeek()));
                }}
              />
            )}
          </For>
        </div>
      </div>
      <Button text="Lagre" onClick={() => logger("save")} />
    </div>
  );
};

export default WeekView;
