import { invoke } from "@tauri-apps/api/core";

export const logger = (log: any) => {
  invoke("log", { log: JSON.stringify(log) });
};
