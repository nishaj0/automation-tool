import fs from "node:fs";
import path from "node:path";
import { REST, Routes } from "discord.js";
import { ENV, logger } from "../../../config";

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

// Important Note: this script is used to deploy the commands to Discord. this intended to be run separately,
// re-deploy this only if you update the slash command definitions (description, options etc),
// - you're free to modify parts such as the execute function as much as you like without redeployment.

// read all the commands. TODO: Refactor this logic to use a type-safe import instead of relying on the file system.
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(ENV.DISCORD_BOT_TOKEN);

// deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(ENV.DISCORD_BOT_CLIENT_ID, ENV.DISCORD_BOT_TEST_GUILD_ID),
      { body: commands },
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
