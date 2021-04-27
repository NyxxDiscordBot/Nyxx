import { CommandInteraction, Emoji } from 'discord.js';
import { NyxxEmojis, NyxxColors } from '../../../lib/Constants';
import NyxxEmbed from '../../struct/NyxxEmbed';
import Command from '../../struct/SlashCommand';

export default class SlashStealCommand extends Command {
  constructor() {
    super('steal', {
      name: 'steal',
      description: 'Steals an emoji from another server, and adds it to yours!',
      options: [
        {
          name: 'Emoji',
          description: 'The emoji you want to steal.',
          type: 3,
          required: true,
        },
      ],
    });
  }

  async exec(msg: CommandInteraction) {
    const embed = new NyxxEmbed(this.client, undefined, msg.user);

    const phrase = msg.options[0].value as string;

    const emojiObject = phrase.substring(1, phrase.length - 1);

    const emojiData = emojiObject.split(':');

    const emoji = {
      name: emojiData[1],
      animated: (emojiData[0] === 'a'),
      url: `https://cdn.discordapp.com/emojis/${emojiData[2]}`,
      id: emojiData[2],
    };

    embed.setTitle(`Stealing Emoji... ${NyxxEmojis.LOADING}`);
    embed.setColor(NyxxColors.WARN);
    await msg.reply(embed);
    let stolenEmoji: Emoji | undefined;
    try {
      stolenEmoji = await msg.guild?.emojis.create(emoji.url as string, emoji.name, { reason: 'Stolen Command Ran' });
    } catch (e) {
      embed.setTitle('Failed!');
      embed.setDescription('Emoji failed to steal.');
      embed.addField('Error', `\`${e}\``);
      embed.setColor(NyxxColors.ERROR);
      return msg.editReply(embed);
    }
    embed.setTitle('Stolen!');
    embed.setDescription(`Emoji ${stolenEmoji} stolen with name ${stolenEmoji?.name}`);
    embed.setColor(NyxxColors.SUCCESS);
    return msg.editReply(embed);
  }
}
