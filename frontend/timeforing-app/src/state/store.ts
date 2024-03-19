import { createStore } from "solid-js/store";

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

export type StartEndTime = {
  monday: { start: string; end: string };
  tuesday: { start: string; end: string };
  wednesday: { start: string; end: string };
  thursday: { start: string; end: string };
  friday: { start: string; end: string };
  saturday: { start: string; end: string };
  sunday: { start: string; end: string };
};

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

export type WorkWeek = WorkDay[];

type store = {
  user: user | null;
  page: page;
  preferences: { startEndTime: StartEndTime; timeCodes: string[] };
};

export const [appState, setAppState] = createStore<store>({
  user: null,
  page: page.weekView,
  preferences: {
    startEndTime: {
      monday: { start: "08:00", end: "15:30" },
      tuesday: { start: "08:00", end: "15:30" },
      wednesday: { start: "08:00", end: "15:30" },
      thursday: { start: "08:00", end: "15:30" },
      friday: { start: "08:00", end: "15:30" },
      saturday: { start: "08:00", end: "15:30" },
      sunday: { start: "08:00", end: "15:30" },
    },
    timeCodes: ["60190-04", "60190-01"],
  },
});
