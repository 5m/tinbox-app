import IndexedItemStore from 'stores/IndexedItemStore';
import ActionTypes from 'constants/ActionTypes';
import AuthStore from 'stores/AuthStore';

import { APIv2 } from 'lib/api';
import {
    verifyProtectedResourceResponse,
    jsonResponse
} from 'services/ServiceUtils';


export class TicketStore extends IndexedItemStore {
    constructor() {
        super();
        this.subscribe(() => this.onDispatch);

        this.api = (new APIv2())
            .onResponse(verifyProtectedResourceResponse)
            .onResponse(jsonResponse)
    }

    _getTickets() {
        var token = AuthStore.token;

        this.api.url('/tickets/')
            .headers({
                Authorization: `Bearer ${token.access_token}`
            })
            .get()
            .exec()
            .then(json => {
                if (DEBUG) {
                    console.log(
                        `${ this.constructor.name }`,
                        'Got tickets',
                        json
                    );
                }

                this.bulkSet(action.tickets);
            });
    }

    onDispatch = (action) => {
        if (DEBUG) {
            console.log(`${this.constructor.name} got action`, action);
        }
        switch (action.type) {
            case ActionTypes.REQUEST_TICKETS:
                this._getTickets();
                break;
        }
    };
}


export default new TicketStore();
