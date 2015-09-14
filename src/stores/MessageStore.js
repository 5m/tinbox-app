import ActionTypes from 'constants/ActionTypes';
import IndexedItemStore from 'stores/IndexedItemStore';
import AuthStore from 'stores/AuthStore';

import { APIv2 } from 'lib/api';
import {
    verifyProtectedResourceResponse,
    jsonResponse
} from 'services/ServiceUtils';


export class MessageStore extends IndexedItemStore {
    items = [];

    constructor() {
        super();
        this.subscribe(() => this.onDispatch);

        this.api = (new APIv2())
            .onResponse(verifyProtectedResourceResponse)
            .onResponse(jsonResponse)
    }

    create(body, replyIn=null, subject=null) {
        var payload = {
            body: body,
            reply_in: replyIn,
            subject: subject
        };
        var token = AuthStore.token;

        if (DEBUG) {
            console.log(`${this.constructor.name}.create: payload`, payload);
        }

        return this.api.url('/messages/')
            .headers({
                Authorization: `Bearer ${token.access_token}`,
                'Content-Type': 'application/json'
            })
            .bodyJSON(payload)
            .post()
            .exec()
            .then(json => {
                if (DEBUG) {
                    console.log(`${this.constructor.name} Posted message`,
                        json);
                }
            });
    }

    handleCreateMessage(action) {
        this.create(action.body, action.replyIn, action.subject)
            .then(json => {
                console.log()
                this.updateItem(json)
            });
    }

    onDispatch = action => {
        switch (action.type) {
            case ActionTypes.CREATE_MESSAGE:
                this.handleCreateMessage(action);
                break;
        }
    }
}


export default new MessageStore();
