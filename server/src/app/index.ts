import { logger } from "../config";
import type { App } from "../types/app";
import discord from "./discord";

export const apps: Record<string, App> = {
  discord,
};

export const startAllApps = async () => {
  for (const app of Object.values(apps)) {
    try {
      await app.start();
      logger.info(`Started app: ${app.name}`);
    } catch (err) {
      logger.error(`failed to start app: ${app.name}, Error: ${err}`);
    }
  }
};
