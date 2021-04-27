import { CommandHandler } from 'discord-akairo';
import { Collection } from 'discord.js';
import NyxxCommand from './NyxxCommand';

class NyxxCommandHandler extends CommandHandler {
  modules!: Collection<string, NyxxCommand>
}

export default NyxxCommandHandler;
