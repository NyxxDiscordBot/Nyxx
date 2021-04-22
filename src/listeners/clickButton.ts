import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import commandCache from '../../lib/util/CommandCache';

class ClickButtonHandler extends Listener {
  constructor() {
    super('clickButton', {
      emitter: 'client',
      event: 'clickButton',
    });
  }

  exec(button: any) {
    button.message.channel.send('UwU');
  }
}

export default ClickButtonHandler;
