import AppDispatcher from 'dispatchers/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';

export class TicketActions {
    updateTickets(tickets) {
        AppDispatcher.dispatch(
            ActionTypes.REQUEST_TICKETS,
            { tickets: tickets });
    }
}

export default new TicketActions();
