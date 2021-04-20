import { model, Schema } from 'mongoose';

const SettingsSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  settings: {
    type: Object,
    required: true,
  },
}, { minimize: false });

export default model('settings', SettingsSchema);
