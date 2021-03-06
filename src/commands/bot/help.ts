import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import NyxxCommand from '../../struct/NyxxCommand';
import NyxxEmbed from '../../struct/NyxxEmbed';

class HelpCommand extends NyxxCommand {
  constructor() {
    super('help', {
      aliases: ['help', 'commands', 'cmds'],
      description: {
        content: 'Displays a list of available commands, or detailed information for a specific command.',
        usage: '[command]',
      },
      category: 'bot',
      ratelimit: 2,
      slashCommand: true,
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          description: 'Command Name',
        },
      ],
    });
  }

  async exec(msg: Message, { command }: { command: Command }) {
    const embed = new NyxxEmbed(this.client, msg);

    if (!command) {
      embed.addField('❯  Commands', 'A list of available commands.\nFor additional info on a command, type `n!help <command>`');

      this.handler.categories.mapValues((category) => {
        embed.addField(`❯  ${category.id.replace(/(\b\w)/gi, (lc) => lc.toUpperCase())}`, `${category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`${cmd.aliases[0]}\``).join(' ')}`);
      });

      return msg.channel.send(embed);
    }

    embed.setTitle(`\`${command.aliases[0]}${command.description.usage ? ` ${command.description.usage}` : ''}\``);
    embed.addField('❯  Description', `${command.description.content ? command.description.content : ''} ${command.description.ownerOnly ? '\n**[Bot Owner Only]**' : ''}`);

    if (command.aliases.length > 1) embed.addField('❯  Aliases', `\`${command.aliases.join('` `')}\``, true);
    if (command.description.examples && command.description.examples.length) embed.addField('❯  Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``, true);

    return msg.channel.send(embed);
  }
}
export default HelpCommand;
