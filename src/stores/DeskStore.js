import ActionTypes from 'constants/ActionTypes';
import BaseStore from 'stores/BaseStore';

export class DeskStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this.onDispatch);
        this._desks = [];
    }

    getDesks() {
        return this._desks;
    }

    onDispatch = (action) => {
        switch (action.type) {
            case ActionTypes.DESKS_UPDATED:
                break;
        }
    };
}
