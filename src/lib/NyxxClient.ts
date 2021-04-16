import { AkairoClient, CommandHandler } from 'discord-akairo';

class NyxxClient extends AkairoClient {
  commandHandler: CommandHandler;

  constructor() {
    super({
      ownerID: '401792058970603539',
    });

    this.commandHandler = new CommandHandler(this, {
      directory: '../commands',
      prefix: 'g!', // todo: add database lol
    });
  }
}

export default NyxxClient;
