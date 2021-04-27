import { Message, MessageEmbed, User } from 'discord.js';
import { NyxxColors, Version } from '../../lib/Constants';
import NyxxClient from './NyxxClient';

class NyxxEmbed extends MessageEmbed {
  constructor(client: NyxxClient, message?: Message, author?: User) {
    super({
      author: {
        name: author?.username || message?.author.username,
        iconURL: author?.avatarURL() || message?.author.avatarURL() as string,
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
