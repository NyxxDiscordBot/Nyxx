import { Command } from 'discord-akairo';
import { Emoji, Message } from 'discord.js';
import { NyxxEmojis, NyxxColors } from '../../../lib/Constants';
import NyxxClient from '../../struct/NyxxClient';
import NyxxEmbed from '../../struct/NyxxEmbed';

class StealCommand extends Command {
  constructor() {
    super('steal', {
      aliases: ['steal', 'takeemoji', 'stealemoji'],
      description: {
        content: 'Steals an emoji from another server, and adds it to yours!',
        usage: '[emoji, (emoji 2, emoji 3, ...)]',
      },
      category: 'bot',
      ratelimit: 2,
      args: [
        {
          id: 'emoji',
          type: (msg, phrase) => {
            if (!phrase) return null;

            const emojiObject = phrase.substring(1, phrase.length - 1);

            const emojiData = emojiObject.split(':');

            const emoji = {
              name: emojiData[1],
              animated: (emojiData[0] === 'a'),
              url: `https://cdn.discordapp.com/emojis/${emojiData[2]}`,
              id: emojiData[2],
            };

            return emoji;
          },
        },
      ],
    });
  }

  async exec(msg: Message, { emoji }: { emoji: Emoji }) {
    const embed = new NyxxEmbed(msg, this.client as NyxxClient);

    if (!emoji) {
      embed.setTitle('No Emoji Provided!');
      embed.setColor(NyxxColors.ERROR);
      return msg.channel.send(embed);
    }

    embed.setTitle(`Stealing Emoji... ${NyxxEmojis.LOADING}`);
    embed.setColor(NyxxColors.WARN);
    const m = await msg.channel.send(embed);
    let stolenEmoji: Emoji | undefined;
    try {
      stolenEmoji = await msg.guild?.emojis.create(emoji.url as string, emoji.name, { reason: 'Stolen Command Ran' });
    } catch (e) {
      embed.setTitle('Failed!');
      embed.setDescription('Emoji failed to steal.');
      embed.addField('Error', `\`${e}\``);
      embed.setColor(NyxxColors.SUCCESS);
      return m.edit(embed);
    }
    embed.setTitle('Stolen!');
    embed.setDescription(`Emoji ${stolenEmoji} stolen with name ${stolenEmoji?.name}`);
    embed.setColor(NyxxColors.ERROR);
    return m.edit(embed);
  }
}
export default StealCommand;
