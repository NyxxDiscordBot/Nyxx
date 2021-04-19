import { Listener } from 'discord-akairo';
import { NyxxStatuses } from '../../lib/Constants';
import NyxxClient from '../struct/NyxxClient';

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    (this.client as NyxxClient).logger.info('Nyxx Bot Ready!');

    function ChangeStatus(client: NyxxClient) {
      const status = NyxxStatuses[Math.floor(
        Math.random() * NyxxStatuses.length,
      )];
      client.user?.setActivity(status.text, { type: status.type });
    }

    ChangeStatus(this.client as NyxxClient);

    setTimeout(() => ChangeStatus(this.client as NyxxClient), 120000);
  }
}

export default ReadyListener;
