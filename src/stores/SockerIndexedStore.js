import config from 'config';

import IndexedItemStore from 'stores/IndexedItemStore';

import { Socker } from 'socker.js';


export class SockerIndexedStore extends IndexedItemStore{
    constructor() {
        super();
        DEBUG && console.log(`${this.constructor.name}: Starting Socker`);
        this._socker = new Socker(config.socker_uri);

        this.addChangeListener(this.subscribeToItems.bind(this));
    }

    onMessage(message) {
        DEBUG && console.log('onMessage', message);
    }

    subscribeToItems() {
        if (! ('_getSockerChannels' in this)) {
            DEBUG && console.warn(
                `${this.constructor.name} no _getSockerChannels method`)
            return;
        }

        DEBUG && console.log(`${this.constructor.name} Subscribing`)

        for (let item in this.map.values()) {
            let channels = this._getSockerChannels(item);
            this._socker.on(channels, onMessage);
        }
    }

    sockerSubscribe(channel) {
        DEBUG && console.debug('Subscribe to ', channel);
        this._socker.on(channel, this.onMessage);
    }
}

export default SockerIndexedStore;
