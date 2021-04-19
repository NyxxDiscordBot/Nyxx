import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { NyxxColors, NyxxEmojis } from '../../../lib/Constants';
import NyxxClient from '../../struct/NyxxClient';
import NyxxEmbed from '../../struct/NyxxEmbed';

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: 'Gets the websocket and API ping!',
      category: 'bot',
    });
  }

  async exec(msg: Message) {
    const embed = new NyxxEmbed(msg, this.client as NyxxClient);

    embed.setTitle(`Pinging... ${NyxxEmojis.LOADING}`);
    embed.setColor(NyxxColors.WARN);
    const m = await msg.channel.send(embed);

    embed.setTitle('Pong!');
    embed.setDescription(`:ping_pong: Client WS Ping: \`${this.client.ws.ping} ms\`\n🖥️ API Ping: \`${Date.now() - msg.createdTimestamp} ms\``);
    embed.setColor(NyxxColors.SUCCESS);
    m.edit(embed);
  }
}

export default PingCommand;
