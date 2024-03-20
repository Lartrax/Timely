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

export type Preferences = { start_end_time: StartEndTime; time_codes: string[] };

type store = {
  user: user | null;
  page: page;
  preferences: Preferences;
  activeWorkWeek: ActiveWorkWeek;
};

const today = new Date();

export const getPreferences = async (): Promise<Preferences> => {
  // TODO: Try to get start and end-time from server

  const defaultPrefs: Preferences = {
    start_end_time: [
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
    ],
    time_codes: [],
  };
  const Preferences: Preferences = await fetch(
    `https://database.larserik.space/preferences/${appState.user?.user_id}`,
    {
      method: "GET",
    }
  ).then((res) => {
    if (res.status === 200) {
      // Success
      return res.json();
    } else {
      // Failed, meaning they do not exist yet, so we create them
      updatePreferences(defaultPrefs);
      return null;
    }
  });
  // If they are not found, use default
  return (Preferences || {

  });
};

export const updatePreferences = async (prefs: Preferences) => {
  fetch(`https://database.larserik.space/preferences/${appState.user?.user_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prefs),
  }).catch((e) => console.log(e));
}

const newWeekFromTemplate = async (): Promise<WorkDay[]> => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const startEndTime = (await getPreferences()).start_end_time;

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
      week: (getWeek(today) < 10 ? "0" + getWeek(today) : getWeek(today).toString()),
      year: getYear(today).toString(),
      days: newWeekFromTemplate(),
    }
  );
};

export const [appState, setAppState] = createStore<store>({
  user: null,
  page: page.weekView,
  preferences: {
    start_end_time: [
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
      { start: "08:00", end: "15:30" },
    ], time_codes: []
  },
  activeWorkWeek: { week: getWeek(today) < 10 ? "0" + getWeek(today) : getWeek(today).toString(), year: getYear(today).toString(), days: [] },
});
