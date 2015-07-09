import { register } from 'dispatcher';
import { createStore, mergeIntoBag, isInBag } from './StoreUtils';
import selectn from 'selectn';

const _tickets = {};

const TicketStore = createStore({
    contains(fullName, fields) {
        return isInBag(_tickets, fullName, fields);
    },

    get(fullName) {
        return _tickets[fullName];
    }
});

TicketStore.dispatchToken = register(action => {
    const responseTickets = selectn('response.tickets', action);
    if (responseTickets) {
        mergeIntoBag(_tickets, responseTickets);
        TicketStore.emitChange();
    }
});

export default TicketStore;
