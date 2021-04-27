import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import commandCache from '../../lib/util/CommandCache';

class CommandStartedHandler extends Listener {
  constructor() {
    super('commandStarted', {
      emitter: 'commandHandler',
      event: 'commandStarted',
    });
  }

  async exec(msg: Message, command: Command) {
    commandCache.push({
      command: command.id,
      executer: msg.author.id,
      startedAt: new Date(),
    });
  }
}

export default CommandStartedHandler;
