import { Client, type ClientOptions, Collection, type CommandInteraction, type SlashCommandBuilder } from "discord.js";

export type Command = Collection<
  string,
  {
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
  }
>;

// extend the base Client class to add the commands property, info: this is based on discord.js doc
export class ExtendedClient extends Client {
  commands: Command;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}
