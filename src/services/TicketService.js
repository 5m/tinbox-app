import AuthStore from 'stores/AuthStore';
import TicketActions from 'actions/TicketActions';
import { APIv2 } from 'lib/api';
import {
    verifyProtectedResourceResponse,
    jsonResponse
} from 'services/ServiceUtils';


export class TicketService {
    constructor() {
        this.api = (new APIv2())
            .onResponse(verifyProtectedResourceResponse)
            .onResponse(jsonResponse)
    }

    getTickets() {
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
                TicketActions.updateTickets(json);
            });
    }
}

export default new TicketService();
