import 'whatwg-fetch';
import 'config';
import { api } from 'lib';

export function postMessage(body, replyIn=null, subject=null) {
    var payload = {
        body: body,
        reply_in: replyIn,
        subject: subject
    };

    //return api.post('message', payload);

    return fetch(config.api_url('message'), {
        method: 'post',
        headers: {
            'Accept': 'applicatnio/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then(response => {
        response.json().then(json => {
            return json;
        })
    });
}
