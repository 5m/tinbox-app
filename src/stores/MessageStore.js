import ActionTypes from 'constants/ActionTypes';
import SockerIndexedStore from 'stores/SockerIndexedStore';
import AuthStore from 'stores/AuthStore';

import TicketActions from 'actions/TicketActions';

import { APIv2 } from 'lib/api';
import {
    verifyProtectedResourceResponse,
    jsonResponse
} from 'services/ServiceUtils';


export class MessageStore extends SockerIndexedStore {
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

        DEBUG && console.log(`${this.constructor.name}.create: payload`,
            payload);


        return this.api.url('/messages/')
            .headers({
                Authorization: `Bearer ${token.access_token}`,
                'Content-Type': 'application/json'
            })
            .bodyJSON(payload)
            .post()
            .exec()
            .then(json => {
                DEBUG && console.log(`${this.constructor.name} Posted message`,
                    json);
                return json;
            });
    }

    handleCreateMessage(action) {
        this.create(action.body, action.replyIn, action.subject)
            .then(json => {
                this.updateItem(json)
                TicketActions.newMessage(json);
            });
    }

    onDispatch = action => {
        switch (action.type) {
            case ActionTypes.CREATE_MESSAGE:
                DEBUG && console.group(this.constructor.name);
                this.handleCreateMessage(action);
                DEBUG && console.groupEnd(this.constructor.name);
                break;
        }
    }
}


export default new MessageStore();
