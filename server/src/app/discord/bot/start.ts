import { Client, Events, GatewayIntentBits } from "discord.js";
import { ENV, logger } from "../../../config";

const botStart = async () => {
  try {
    const client = new Client({ intents: GatewayIntentBits.Guilds });

    client.once(Events.ClientReady, (readyClient) => {
      console.log(`Logged in as ${readyClient.user.tag}`);
    });

    await client.login(ENV.DISCORD_BOT_TOKEN);
  } catch (err) {
    logger.error(`failed to start Discord Bot, Error:${err}`);
  }
};

botStart();

export default botStart;
