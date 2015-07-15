import 'whatwg-fetch';
import _ from 'lodash';
var config = require('config');

import AuthStore from 'stores/AuthStore';


var { auth } = require('app');

export class API {
    _getSettings(additionalSettings) {
        additionalSettings = additionalSettings || {};

        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        var token = AuthStore.getToken();

        if (token) {
            _.merge(headers, {
                Authorization: [
                    token.token_type,
                    token.access_token
                ].join(' ')
            });
        }

        console.log('headers', headers);

        var settings = _.merge(
            {},
            {
                error: [auth.jqXHRErrorHandler.bind(auth)],
                headers: headers
            },
            additionalSettings
        );
        console.log('settings', settings);
        return settings;
    }
    get(path, data) {
        return fetch(
            config.api_url(path),
            this._getSettings(
                {
                    type: 'GET',
                    body: data
                }
            ))
            .then(response => {
                return response.json()
            })
            .then(json => {
                return json;
            });
    }

    post(path, data) {
        return fetch(
            config.api_url(path),
            this._getSettings(
                {
                    type: 'POST',
                    body: data
                }
            ))
            .then(response => {
                return response.json()
            })
            .then(json => {
                return json;
            });
    }
}

export default new API();
