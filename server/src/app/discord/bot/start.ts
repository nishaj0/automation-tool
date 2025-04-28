import fs from "node:fs";
import path from "node:path";
import { Collection, GatewayIntentBits } from "discord.js";
import { ENV, logger } from "../../../config";
import { ExtendedClient } from "./types";

const botStart = async () => {
  try {
    const client = new ExtendedClient({ intents: GatewayIntentBits.Guilds });

    client.commands = new Collection();

    const foldersPath = path.join(__dirname, "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    // Initialize the commands. TODO: Refactor this logic to use a type-safe import instead of relying on the file system.
    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts"));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        } else {
          logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      }
    }

    // event handler
    const eventPath = path.join(__dirname, "events");
    const eventFiles = fs.readdirSync(eventPath).filter((file) => file.endsWith(".ts"));

    for (const file of eventFiles) {
      const filePath = path.join(eventPath, file);
      const event = require(filePath).default;
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      }
      if (event.execute) {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }

    await client.login(ENV.DISCORD_BOT_TOKEN);
  } catch (err) {
    logger.error(`failed to start Discord Bot, Error:${err}`);
  }
};

botStart();

export default botStart;
