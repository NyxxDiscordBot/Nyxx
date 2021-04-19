import { BaseCluster, ShardingManager } from 'kurasuta';
import NyxxClient from './NyxxClient';
import Log from './NyxxLogger';

export class NyxxCluster extends BaseCluster {
  public client!: NyxxClient;

  logger: typeof Log

  constructor(...args: [ShardingManager]) {
    super(...args);

    this.client.cluster = this;
    Log.setSettings({
      prefix: [`Cluster ${this.id}`],
    });
    this.logger = Log;
  }

  async launch(): Promise<void> {
    this.logger.info('Initializing Client...');

    this.client.init().then(() => {
      this.logger.info('Client initialized!');
    }).catch((err) => {
      this.logger.fatal('Failed to initialize client', err);
      throw err;
    });

    this.logger.info('Logging in...');

    this.client.login(process.env.BOT_TOKEN).then(() => {
      this.logger.info('Client Logged in!');
    }).catch((err) => {
      this.logger.fatal('Failed to log in', err);
      throw err;
    });
  }
}

export default NyxxCluster;
