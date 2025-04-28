import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

const data: SlashCommandBuilder = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");

const execute = async (interaction: CommandInteraction) => {
  await interaction.reply("Pong!");
};

export { data, execute };
