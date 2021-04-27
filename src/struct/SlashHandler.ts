/* eslint-disable consistent-return */
import { AkairoHandler, AkairoHandlerOptions } from 'discord-akairo';
import { Collection, Interaction } from 'discord.js';
import NyxxClient from './NyxxClient';
import type SlashCommand from './SlashCommand';

export default class SlashHandler extends AkairoHandler {
  modules!: Collection<string, SlashCommand>

  loadFilter: any

  constructor(client: NyxxClient, options: AkairoHandlerOptions) {
    super(client, options);

    this.loadFilter = options.loadFilter;

    this.client.on('interaction', this.handle.bind(this));
  }

  async handle(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    if (!interaction.guildID) {
      return interaction.reply('Slash Commands cannot be used in DMs.', {
        ephemeral: true,
      });
    }

    const command = this.modules.get(interaction.commandName);

    if (!command) {
      return interaction.reply(`Could not find command **${interaction.commandName}**`, {
        ephemeral: true,
      });
    }

    if (command.ownerOnly && !this.client.isOwner(interaction.user)) {
      return interaction.reply(`Sorry, but command **${interaction.commandName}** is for bot owners only.`, {
        ephemeral: true,
      });
    }

    try {
      this.emit('slashStarted', interaction, command);
      await command.exec(interaction);
    } catch (error: unknown) {
      console.error(error);

      const reply = interaction.deferred ? interaction.editReply : interaction.reply;
      reply(`Something went wrong trying to run \`${interaction.commandName}\`!`, {
        ephemeral: true,
      });
    }
  }
}
