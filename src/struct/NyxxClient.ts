import {
  AkairoClient,
  AkairoOptions,
  InhibitorHandler,
  ListenerHandler,
  MongooseProvider,
} from 'discord-akairo';
import { join } from 'path';
import { ClientOptions, Intents, Message } from 'discord.js';
import { Logger } from 'tslog';
import { NyxxCluster } from './NyxxCluster';
import SettingsModel from '../models/Settings.model';
import AnalyticsModel from '../models/Analytics.model';
import NyxxAnalytics from './NyxxAnalytics';
import NyxxCommandHandler from './NyxxCommandHandler';
import SlashHandler from './SlashHandler';
import Command from './SlashCommand';

class NyxxClient extends AkairoClient {
  commandHandler: NyxxCommandHandler;

  listenerHandler: ListenerHandler;

  inhibitorHandler: InhibitorHandler;

  slashHandler: SlashHandler;

  cluster?: NyxxCluster;

  logger: Logger;

  settings: MongooseProvider;

  analytics: NyxxAnalytics;

  constructor(clientOptions: AkairoOptions & ClientOptions) {
    super({
      ownerID: ['401792058970603539', '162305223589756928'],
      intents: new Intents(Intents.ALL),
      presence: {
        activities: [
          {
            type: 'WATCHING',
            name: 'for n!help',
          },
          {
            type: 'LISTENING',
            name: 'nothing :(',
          },
          {
            type: 'PLAYING',
            name: 'https://domain.tld',
          },
        ],
      },
    }, {
      // @ts-ignore
      intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS',
        'GUILD_INTEGRATIONS',
      ],
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

    this.analytics = new NyxxAnalytics(AnalyticsModel);

    this.commandHandler = new NyxxCommandHandler(this, {
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

    this.slashHandler = new SlashHandler(this, {
      directory: join(__dirname, '..', 'slash'),
      classToHandle: Command,
    });
  }

  async init(): Promise<this> {
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
      gateway: this.ws,
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

    this.logger.info('Loading Slash Commands...');

    this.slashHandler.loadAll();

    this.logger.info('Loaded Slash Commands!');

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
