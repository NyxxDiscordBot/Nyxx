import { Listener } from 'discord-akairo';
import { ApplicationCommand, Collection, Snowflake } from 'discord.js';
import { NyxxStatuses } from '../../lib/Constants';
import NyxxClient from '../struct/NyxxClient';

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async exec() {
    (this.client as NyxxClient).logger.info('Nyxx Bot Ready!');

    // eslint-disable-next-line operator-linebreak
    const commands: Collection<Snowflake, ApplicationCommand> =
    // @ts-ignore
      await this.client.application.commands.fetch();

    (this.client as NyxxClient).slashHandler.modules.forEach(async (slashCommand) => {
      const commandExists = commands.get(slashCommand.id);
      if (process.env.NODE_ENV === 'production') {
        if (commandExists) {
          // @ts-ignore
          await this.client.application.commands.edit(slashCommand.id, {
            name: slashCommand.data.name,
            description: slashCommand.data.description,
            options: slashCommand.data.options,
          });
          return;
        }
        // @ts-ignore
        await this.client.application.commands.create({
          name: slashCommand.data.name,
          description: slashCommand.data.description,
          options: slashCommand.data.options,
        });
      } else {
        if (commandExists) {
          // @ts-ignore
          this.client.guilds.cache.get('832664087808049232').commands.edit(slashCommand.id, {
            name: slashCommand.data.name,
            description: slashCommand.data.description,
            options: slashCommand.data.options,
          });
          return;
        }
        // @ts-ignore
        this.client.guilds.cache.get('832664087808049232').commands.create({
          name: slashCommand.data.name,
          description: slashCommand.data.description,
          options: slashCommand.data.options,
        });
      }
    });

    function ChangeStatus(client: NyxxClient) {
      const status = NyxxStatuses[Math.floor(
        Math.random() * NyxxStatuses.length,
      )];
      client.user?.setActivity(status.text, { type: status.type });
    }

    ChangeStatus(this.client as NyxxClient);

    setTimeout(() => ChangeStatus(this.client as NyxxClient), 120000);
  }
}

export default ReadyListener;
