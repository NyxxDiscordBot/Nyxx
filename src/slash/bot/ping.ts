import { CommandInteraction } from 'discord.js';
import { NyxxEmojis, NyxxColors } from '../../../lib/Constants';
import NyxxEmbed from '../../struct/NyxxEmbed';
import Command from '../../struct/SlashCommand';

export default class SlashPingCommand extends Command {
  constructor() {
    super('ping', {
      name: 'ping',
      description: 'Gets the websocket and API ping!',
    });
  }

  async exec(msg: CommandInteraction) {
    const embed = new NyxxEmbed(this.client, undefined, msg.user);

    embed.setTitle(`Pinging... ${NyxxEmojis.LOADING}`);
    embed.setColor(NyxxColors.WARN);
    await msg.reply(embed);

    embed.setTitle('Pong!');
    embed.setDescription(`:ping_pong: Client WS Ping: \`${this.client.ws.ping} ms\`\n🖥️ API Ping: \`${Date.now() - msg.createdTimestamp} ms\``);
    embed.setColor(NyxxColors.SUCCESS);
    msg.editReply(embed);
  }
}
