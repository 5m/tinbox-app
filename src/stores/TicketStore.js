import BaseStore from 'stores/BaseStore';
import ActionTypes from 'constants/ActionTypes';


export class TicketStore extends BaseStore {
    items = {};

    constructor() {
        super();
        this.subscribe(() => this.onDispatch);
    }

    _asArray() {
        var array = [];
        for (var key in this.items) {
            array.push(this.items[key]);
        }
        return array;
    }

    getTickets() {
        return this._asArray();
    }

    getTicket(pk) {
        if (!pk) {
            throw new Error('getTicket(pk) - pk can not be falsey');
        }
        return this.items[pk];
    }

    onDispatch = (action) => {
        if (DEBUG) {
            console.log(`${this.constructor.name} got action`, action);
        }
        switch (action.type) {
            case ActionTypes.REQUEST_TICKETS:
                action.tickets.forEach((ticket) => {
                    this.items[ticket.pk] = ticket;
                });
                this.emitChange();
                break;
        }
    };
}


export default new TicketStore();
