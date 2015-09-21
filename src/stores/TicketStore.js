import mixins from 'es6-mixins';

import SockerIndexedStore from 'stores/SockerIndexedStore';
import IndexedItemStore from 'stores/IndexedItemStore';
import ActionTypes from 'constants/ActionTypes';
import AuthStore from 'stores/AuthStore';

import { APIv2 } from 'lib/api';
import {
    verifyProtectedResourceResponse,
    jsonResponse
} from 'services/ServiceUtils';


export class TicketStore extends SockerIndexedStore {
    sockerItemType = 'tickets';

    constructor() {
        super();
        this.subscribe(() => this.onDispatch);

        this.api = (new APIv2())
            .onResponse(verifyProtectedResourceResponse)
            .onResponse(jsonResponse)
    }

    _getSockerChannels(ticket) {
        let channels = [];

        channels.push(`tickets.${ticket.pk}.threads.*`)
        for (let thread in ticket.threads) {
            channels.push(`threads.${thread.pk}.messages.*`)
        }
        return channels;
    }

    _sockerSubscribe = (e) => {
        for (let key in Object.keys(this.map.getOwnPropertyNames())) {
            this.sockerSubscribe(`ticket.${key}`);
        }
    };

    _getTickets() {
        var token = AuthStore.token;
        DEBUG && console.log('Requesting tickets');

        this.api.url('/tickets/')
            .headers({
                Authorization: `Bearer ${token.access_token}`
            })
            .get()
            .exec()
            .then(json => {
                DEBUG && console.log(
                    `${ this.constructor.name } Got tickets`,
                    json
                );

                this.bulkSet(json);
            });
    }

    updateMessage(message) {
        let ticket = this.get(message.ticket_pk);
        debugger;
    }

    _getTicket(key) {
        this.api.url(`/tickets/${key}/`)
            .headers({
                Authorization: `Bearer ${AuthStore.token.access_token}`
            })
            .get()
            .exec()
            .then(ticket => {
                DEBUG && console.log(
                    `${ this.constructor.name } Got tickets`,
                    ticket
                );

                this.updateItem(ticket);
            });
    }

    onDispatch = (action) => {
        DEBUG && console.group('TicketStore');
        switch (action.type) {
            case ActionTypes.REQUEST_TICKETS:
                this._getTickets();
                break;
            case ActionTypes.REQUEST_TICKET:
                this._getTicket(action.pk);
                break;
            case ActionTypes.NEW_MESSAGE:
                this.updateMessage(action.message)
                break;
        }
        DEBUG && console.groupEnd()
    };
}

//ReactMixin(TicketStore.prototype, SockerStoreMixin.prototype);


export default new TicketStore();
