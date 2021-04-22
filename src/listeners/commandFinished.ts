/* eslint-disable max-classes-per-file */
import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import commandCache from '../../lib/util/CommandCache';
import NyxxClient from '../struct/NyxxClient';

class CommandFinishedHandler extends Listener {
  constructor() {
    super('commandFinished', {
      emitter: 'commandHandler',
      event: 'commandFinished',
    });
  }

  async exec(msg: Message, command: Command) {
    const cachedCommand = commandCache.find((cmd) => (
      cmd.executer === msg.author.id && cmd.command === command.id
    ));
    try {
      await (this.client as NyxxClient).analytics.add(
        (msg.guild ? msg.guild.id : 'DM'),
        msg.author.id,
        command.id,
        cachedCommand?.startedAt as Date,
        Date.now() - (cachedCommand?.startedAt as Date).getTime(),
      );
    } catch (e) {
      (this.client as NyxxClient).logger.error(e);
    }
  }
}

export default CommandFinishedHandler;
