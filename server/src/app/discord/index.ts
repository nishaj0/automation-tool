import type { App } from "../../types/app";
import sendMessage from "./actions/sendMessage";
import botStart from "./bot/start";
import newChannelMessage from "./triggers/newChannelMessage";

const DiscordApp: App = {
  name: "Discord",
  triggers: [newChannelMessage],
  actions: [sendMessage],
  start: async () => {
    await botStart();
  },
};

export default DiscordApp;
