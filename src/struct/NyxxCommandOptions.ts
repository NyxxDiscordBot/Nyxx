import { CommandOptions } from 'discord-akairo';

interface NyxxCommandOptions extends CommandOptions {
  slashCommand?: false | boolean
}

export default NyxxCommandOptions;