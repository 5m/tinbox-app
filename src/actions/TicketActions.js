import AppDispatcher from 'dispatchers/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';

export class TicketActions {
    list(tickets) {
        // TODO: Accept filter options
        AppDispatcher.dispatch(ActionTypes.REQUEST_TICKETS);
    }
    get(pk) {

    }
}

export default new TicketActions();
