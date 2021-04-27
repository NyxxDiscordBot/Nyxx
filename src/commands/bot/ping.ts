import { Message } from 'discord.js';
import { NyxxColors, NyxxEmojis } from '../../../lib/Constants';
import NyxxCommand from '../../struct/NyxxCommand';
import NyxxEmbed from '../../struct/NyxxEmbed';

class PingCommand extends NyxxCommand {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: {
        content: 'Gets the websocket and API ping!',
      },
      slashCommand: true,
      category: 'bot',
    });
  }

  async exec(msg: Message) {
    const embed = new NyxxEmbed(this.client, msg);

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
