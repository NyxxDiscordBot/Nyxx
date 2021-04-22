import { model, Schema } from 'mongoose';

const AnalyticsSchema = new Schema({
  guild: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  },
  executedAt: {
    type: Date,
    required: true,
  },
  executionTime: {
    type: Number,
    required: true,
  },
}, { minimize: false });

export default model('analytics', AnalyticsSchema);
