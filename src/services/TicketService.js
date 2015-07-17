import TicketActions from 'actions/TicketActions';
import api from 'lib/api';

export class TicketService {
    getTickets() {
        api.get('/tickets/').then(json => {
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
