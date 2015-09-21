import AppDispatcher from 'dispatchers/AppDispatcher';
import ActionTypes from 'constants/ActionTypes';

export class TicketActions {
    list(tickets) {
        // TODO: Accept filter options
        return AppDispatcher.dispatch(ActionTypes.REQUEST_TICKETS);
    }
    get(pk) {
        return AppDispatcher.dispatch(ActionTypes.REQUEST_TICKET, {pk});
    }
    newMessage(message) {
        return AppDispatcher.dispatch(ActionTypes.NEW_MESSAGE, {message});
    }
}

export default new TicketActions();
