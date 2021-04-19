import { Message, MessageEmbed } from 'discord.js';
import { NyxxColors, Version } from '../../lib/Constants';
import NyxxClient from './NyxxClient';

class NyxxEmbed extends MessageEmbed {
  constructor(message: Message, client: NyxxClient) {
    super({
      author: {
        name: message.author.username,
        iconURL: message.author.avatarURL() as string,
      },
      color: NyxxColors.DEFAULT,
      footer: {
        text: `Nyxx ${Version}`,
        iconURL: client.user?.avatarURL() as string,
      },
      timestamp: Date.now(),
    });
  }
}

export default NyxxEmbed;
