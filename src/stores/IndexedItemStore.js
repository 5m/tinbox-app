import _ from 'lodash';
import BaseStore from 'stores/BaseStore';

export class IndexedItemStore extends BaseStore {
    constructor(keyAttribute='pk') {
        super();

        this.keyAttribute = keyAttribute;

        this.map = new Map();
    }

    _getKey = (item) => {
        this._validateItem(item);
        return item[this.keyAttribute];
    };

    _validateItem(item) {
        if (item === undefined) {
            throw new Error('Cannot add an item which is undefined');
        }
        if (item[this.keyAttribute] === undefined ||
            item[this.keyAttribute] === null) {
            throw new Error(`The key attribute "${this.keyAttribute}"
             of the item ${JSON.stringify(item)} is null or undefined`);
        }
    }

    all() {
        return Array.from(this.map.values());
    }

    get(key) {
        return this.map.get(key);
    }

    bulkSet(items) {
        items.forEach((item) => {
            this.setItem(item, false);
        });
        this.emitChange();
    }

    bulkUpdate(items) {
        items.forEach((item) => {
            this.updateItem(items, false);
        });
        this.emitChange();
    }

    setItem(item, emit=true) {
        this.map.set(this._getKey(item), item);

        if (emit) {
            this.emitChange();
        }

        return item;
    }

    updateItem(item, emit=true) {
        var key = this._getKey(item);
        var exists = this.map.has(key);
        var storedItem;

        if (exists) {
            storedItem = _.merge(this.map.get(key), item);
        } else {
            storedItem = this.setItem(item);
        }

        if (emit) {
            this.emitChange();
        }

        return storedItem;
    }
}


export default IndexedItemStore
