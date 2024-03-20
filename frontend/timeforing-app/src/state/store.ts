import { createStore } from "solid-js/store";

import { getWeek, getYear } from "date-fns";
import { logger } from "../functions";

export type user = {
  user_id: string;
  name: string;
  email: string;
  profile_picture: string;
};

export enum page {
  weekView,
  workTimer,
  export,
  archive,
  profile,
}

export type StartEndTime = [
  { start: string; end: string },
  { start: string; end: string },
  { start: string; end: string },
  { start: string; end: string },
  { start: string; end: string },
  { start: string; end: string },
  { start: string; end: string }
];

export type HourCode = {
  code: string;
  description: string;
  hours: number;
};

export type WorkDay = {
  day: string;
  codes: HourCode[];
  start: string;
  end: string;
};

export type ActiveWorkWeek = {
  week: string;
  year: string;
  days: WorkDay[];
};

type store = {
  user: user | null;
  page: page;
  preferences: { startEndTime: StartEndTime; timeCodes: string[] };
  activeWorkWeek: ActiveWorkWeek;
};

const today = new Date();

const getStartEndTime = (): StartEndTime => {
  // TODO: Try to get start and end-time from server

  // If they are not found, use default
  return [
    { start: "08:00", end: "15:30" },
    { start: "08:00", end: "15:30" },
    { start: "08:00", end: "15:30" },
    { start: "08:00", end: "15:30" },
    { start: "08:00", end: "15:30" },
    { start: "08:00", end: "15:30" },
    { start: "08:00", end: "15:30" },
  ];
};

const newWeekFromTemplate = (): WorkDay[] => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const startEndTime = getStartEndTime();

  let WorkDays: WorkDay[] = [];

  startEndTime.forEach((time, i) => {
    WorkDays.push({
      day: days[i],
      codes: [],
      start: time.start,
      end: time.end,
    });
  });

  return WorkDays;
};

export const getCurrentWeekOrCreateNew = async (): Promise<ActiveWorkWeek> => {
  const ActiveWorkWeek: ActiveWorkWeek = await fetch(
    `https://database.larserik.space/work/${appState.user?.user_id}/${getWeek(today)}/${getYear(today)}`,
    {
      method: "GET",
    }
  ).then((res) => {
    if (res.status === 200) {
      // Success
      return res.json();
    } else {
      // Failed
      return null;
    }
  });
  return (
    ActiveWorkWeek || {
      week: getWeek(today),
      year: getYear(today),
      days: newWeekFromTemplate(),
    }
  );
};

export const [appState, setAppState] = createStore<store>({
  user: null,
  page: page.weekView,
  preferences: {
    startEndTime: getStartEndTime(),
    timeCodes: ["60190-04", "60190-01"],
  },
  activeWorkWeek: { week: getWeek(today) < 10 ? "0" + getWeek(today) : getWeek(today).toString(), year: getYear(today).toString(), days: [] },
});
