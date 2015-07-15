import { each, isFunction } from 'lodash';
import { EventEmitter } from 'events';
import shallowEqual from 'react-pure-render/shallowEqual';
import AppDispatcher from 'dispatchers/AppDispatcher';

const CHANGE_EVENT = 'change';

export class BaseStore extends EventEmitter {
    constructor() {
        super();
    }

    subscribe(actionSubscribe) {
        this._dispatchToken = AppDispatcher.register(actionSubscribe());
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    emitChange() {
        if (DEBUG) {
            console.log(`${ this.constructor.name }.emitChange`);
        }
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        if (DEBUG) {
            console.log(`${ this.constructor.name }.addChangeListener`, callback);
        }
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        if (DEBUG) {
            console.log(`${ this.constructor.name }.removeChangeListener`, callback);
        }
        this.removeListener(CHANGE_EVENT, callback);
    }
}

export default BaseStore;
