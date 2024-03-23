import { createStore } from "solid-js/store";

import { getWeek, getYear } from "date-fns";

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

export type StartEndTime = { start: string; end: string };

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

export type Preferences = {
  start_end_time: StartEndTime[];
  time_codes: string[];
};

type store = {
  user: user | null;
  page: page;
  preferences: Preferences;
  activeWorkWeek: ActiveWorkWeek;
  timer: number;
};

const today = new Date();

export const getPreferences = async (
  forceUser?: user
): Promise<Preferences> => {
  const userId = forceUser?.user_id || appState.user?.user_id;

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
    `https://database.larserik.space/preferences/${userId}`,
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
  return Preferences || defaultPrefs;
};

export const updatePreferences = async (
  prefs: Preferences,
  forceUser?: user
) => {
  const userId = forceUser?.user_id || appState.user?.user_id;

  fetch(`https://database.larserik.space/preferences/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prefs),
  }).catch((e) => console.log(e));
};

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const newWeekFromTemplate = async (): Promise<WorkDay[]> => {
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

export const getWeekOrCreateNew = async (
  week: number,
  year: number,
  forceUser?: user
): Promise<ActiveWorkWeek> => {
  const userId = forceUser?.user_id || appState.user?.user_id;

  const ActiveWorkWeek: ActiveWorkWeek = await fetch(
    `https://database.larserik.space/work/${userId}/${week}/${year}`,
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
      week: week.toString(),
      year: year.toString(),
      days: await newWeekFromTemplate(),
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
    ],
    time_codes: [],
  },
  activeWorkWeek: {
    week: getWeek(today).toString(),
    year: getYear(today).toString(),
    days: [],
  },
  timer: 0,
});


let timer = 0;

export const startTimer = () => {
  timer = setInterval(() => {
    setAppState("timer", (time) => time + 1);
  }, 1000);
};

export const stopTimer = () => {
  clearInterval(timer);
};

export const resetTimer = () => {
  setAppState("timer", 0);
};