import {
  ArgumentGenerator,
  ArgumentOptions,
  Command as AkairoCommand,
} from 'discord-akairo';
import NyxxClient from './NyxxClient';
import NyxxCommandOptions from './NyxxCommandOptions';

class NyxxCommand extends AkairoCommand {
  client!: NyxxClient;

  args?: ArgumentOptions[] | ArgumentGenerator | undefined;

  slashCommand?: false | boolean

  constructor(id: string, options: NyxxCommandOptions) {
    super(id, options);

    this.args = options.args;
    this.slashCommand = options.slashCommand;
  }
}

export default NyxxCommand;
