import type { Trigger } from "../../../types/app";

const newChannelMessageHandler = async () => {
  // ... code to handle new channel messages
};
const newChannelMessage: Trigger = {
  id: "new_channel_message",
  name: "New Channel Message",
  description: "Triggered when a new message is sent in a channel",
  listenType: "WEBHOOK",
  handler: newChannelMessageHandler,
};

export default newChannelMessage;
