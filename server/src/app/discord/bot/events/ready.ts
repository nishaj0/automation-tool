import { Events } from "discord.js";
import { logger } from "../../../../config";
import type { ExtendedClient } from "../types";

const readyEvent = {
  name: Events.ClientReady,
  once: true,
  execute(client: ExtendedClient) {
    logger.info(`Ready! Logged in as ${client.user?.tag}`);
  },
};

export default readyEvent;
