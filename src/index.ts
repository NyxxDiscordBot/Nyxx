import { ShardingManager, SharderEvents } from 'kurasuta';
import { join } from 'path';
import { config } from 'dotenv';
import NyxxClient from './struct/NyxxClient';
import Log from './struct/NyxxLogger';

Log.setSettings({
  dateTimeTimezone: 'America/Chicago',
});

Log.info('Starting Shards...');

config();

const Sharder = new ShardingManager(join(__dirname, 'struct', 'NyxxCluster'), {
  client: NyxxClient,
  development: (process.env.NODE_ENV !== 'production'),
  respawn: (process.env.NODE_ENV === 'production'),
  retry: true,
  token: process.env.BOT_TOKEN,
  shardCount: 1,
  clusterCount: 1,
});

Sharder.on(SharderEvents.DEBUG, (message: string) => {
  Log.debug(message);
});

Sharder.spawn().catch((err) => {
  Log.fatal(err);
  throw err;
});
