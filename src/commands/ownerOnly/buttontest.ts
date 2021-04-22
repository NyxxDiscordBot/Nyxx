import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
// @ts-ignore
import 'discord-buttons';

class ButtonTestCommand extends Command {
  constructor() {
    super('uwu', {
      aliases: ['uwu', 'buttontest'],
      description: 'hhhh',
      category: 'ownerOnly',
      ownerOnly: true,
    });
  }

  async exec(msg: Message) {
    // @ts-ignore
    msg.buttons('UwU buttons', {
      buttons: [
        {
          style: 'green',
          label: 'Click me to UwU',
          id: 'uwu',
        },
        {
          style: 'green',
          label: 'Click me to UwU',
          id: 'uwu',
        },
        {
          style: 'green',
          label: 'Click me to UwU',
          id: 'uwu',
        },
        {
          style: 'green',
          label: 'Click me to UwU',
          id: 'uwu',
        },
        {
          style: 'green',
          label: 'Click me to UwU',
          id: 'uwu',
        },
      ],
    });
  }
}

export default ButtonTestCommand;
