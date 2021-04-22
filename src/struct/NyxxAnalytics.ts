import { MongooseProvider } from 'discord-akairo';
import AnalyticsModel from '../models/Analytics.model';

class NyxxAnalytics extends MongooseProvider {
  table: typeof AnalyticsModel;

  constructor(table: typeof AnalyticsModel) {
    super(table);

    this.table = table;
  }

  async add(
    guild: string,
    user: string,
    command: string,
    executedAt: Date,
    executionTime: number,
  ): Promise<void> {
    try {
      await this.table.create({
        guild,
        user,
        command,
        executedAt,
        executionTime,
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default NyxxAnalytics;
