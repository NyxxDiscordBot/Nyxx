import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { NyxxColors, NyxxEmojis } from '../../../lib/Constants';
import NyxxClient from '../../struct/NyxxClient';
import NyxxEmbed from '../../struct/NyxxEmbed';

class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      description: 'Evaluate Javascript Code. Bot Owners Only.',
      category: 'ownerOnly',
      args: [
        {
          id: 'code',
          type: 'string',
          match: 'rest',
        },
      ],
      ownerOnly: true,
    });
  }

  async exec(msg: Message, { code }: { code: string }) {
    const embed = new NyxxEmbed(msg, this.client as NyxxClient);

    embed.setTitle(`Evaluating Code... ${NyxxEmojis.LOADING}`);
    embed.setColor(NyxxColors.WARN);
    const m = await msg.channel.send(embed);

    let result;

    try {
      // shut up eslint :)
      // eslint-disable-next-line no-eval
      result = eval(code);
    } catch (e) {
      embed.setTitle('Failed.');
      embed.addField('Input 📥', `\`\`\`js\n${code}\n\`\`\``);
      embed.addField('Output 📤', `\`\`\`\n${e}\n\`\`\``);
      embed.setColor(NyxxColors.ERROR);
      return m.edit(embed);
    }

    embed.setTitle('Done!');
    embed.addField('Input 📥', `\`\`\`js\n${code}\n\`\`\``);
    embed.addField('Output 📤', `\`\`\`\n${result}\n\`\`\``);
    embed.setColor(NyxxColors.SUCCESS);
    return m.edit(embed);
  }
}

export default EvalCommand;
