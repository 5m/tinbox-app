import _ from 'lodash';
import BaseStore from 'stores/BaseStore';

export class IndexedItemStore extends BaseStore {
    constructor(keyAttribute='uuid') {
        super();

        this.keyAttribute = keyAttribute;

        this._index = {};
    }

    _getKey = (item) => {
        this._validateItem(item);
        return item[this.keyAttribute];
    };

    _validateItem(item) {
        if (item === undefined) {
            throw new Error('Cannot add an item which is undefined');
        }
        if (item[this.key] === undefined || item[this.key] === null) {
            throw new Error(`The key attribute ("${this.key}")
             of the item ${JSON.stringify(item)} is null or undefined`);
        }
    }

    _itemsAsList() {
        var _all = [];

        for (var key in this._index) {
            _all.push(this._index[key]);
        }

        return _all;
    }

    all() {
        return this._itemsAsList();
    }

    get(key) {
        return this._index[key];
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
        })
        this.emitChange();
    }

    setItem(item, emit=true) {
        this._index[this._getKey(item)] = item;

        if (emit) {
            this.emitChange();
        }

        return item;
    }

    updateItem(item, emit=true) {
        var key = this._getKey(item);
        var exists = this._index[key] !== undefined;
        var storedItem;

        if (exists) {
            storedItem = _.merge(this._index[key], item);
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
