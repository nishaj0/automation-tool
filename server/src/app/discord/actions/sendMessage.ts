import type { Actions } from "../../../types/app";

const sendMessageHandler = async () => {
  // ... code to send messages
};

const sendMessage: Actions = {
  id: "send_message",
  name: "Send Message",
  description: "Sends a message to a channel or user",
  handler: sendMessageHandler,
};

export default sendMessage;
