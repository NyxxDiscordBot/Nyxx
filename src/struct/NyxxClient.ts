import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
  MongooseProvider,
} from 'discord-akairo';
import { join } from 'path';
import { ClientOptions, Message } from 'discord.js';
import { Logger } from 'tslog';
import { NyxxCluster } from './NyxxCluster';
import SettingsModel from '../models/Settings.model';

class NyxxClient extends AkairoClient {
  commandHandler: CommandHandler;

  listenerHandler: ListenerHandler;

  inhibitorHandler: InhibitorHandler;

  cluster?: NyxxCluster;

  logger: Logger;

  settings: MongooseProvider;

  constructor(clientOptions: ClientOptions) {
    super({
      ownerID: ['401792058970603539', '162305223589756928'],
    }, {
      ws: {
        properties: {
          $browser: 'Discord iOS',
        },
      },
      ...clientOptions,
    });

    if (!this.cluster) {
      this.logger = new Logger({
        dateTimeTimezone: 'America/Chicago',
      });
    } else {
      this.logger = this.cluster.logger;
    }

    this.settings = new MongooseProvider(SettingsModel);

    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, '..', 'commands'),
      prefix: async (message: Message) => {
        if (message.guild) {
          return this.settings.get(message.guild.id, 'prefix', 'n!');
        }
        return 'n!';
      },
      allowMention: true,
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, '..', 'inhibitors'),
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, '..', 'listeners'),
    });
  }

  async init(): Promise<this> {
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.logger.info('Loading Commands...');
    this.commandHandler.loadAll();
    this.logger.info('Loaded Commands!');

    this.logger.info('Loading Listeners...');
    this.listenerHandler.loadAll();
    this.logger.info('Loaded Listeners!');

    this.logger.info('Loading Inhibitors...');
    this.inhibitorHandler.loadAll();
    this.logger.info('Loaded Inhibitors!');

    this.logger.info('Loading Database...');
    await this.settings.init();
    this.logger.info('Loaded Database!');

    return this;
  }

  async login(token: string) {
    this.logger.info('Loading Database...');
    await this.settings.init();
    this.logger.info('Loaded Database!');
    return super.login(token);
  }
}

export default NyxxClient;
