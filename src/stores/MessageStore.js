import { register } from 'dispatcher';
import { createStore, mergeIntoBag, isInBag } from './StoreUtils';
import selectn from 'selectn';

const _messages = {};

const MessageStore = createStore({
    contains(id, fields) {
        return isInBag(_messages, id, fields);
    },

    get(id) {
        return _messages[id];
    }
});

MessageStore.dispatchToken = register(action => {
    const responseMessages = selectn('response.tickets', action);
    if (responseMessages) {
        mergeIntoBag(_messages, responseMessages);
        MessageStore.emitChange();
    }
});

export default MessageStore;
