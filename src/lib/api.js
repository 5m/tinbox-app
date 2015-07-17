import 'whatwg-fetch';
import _ from 'lodash';
var config = require('config');

import AuthStore from 'stores/AuthStore';


var { auth } = require('app');

export class API {
    constructor() {
        this._beforeTransform = [];
        this._logPrefix = `${ this.constructor.name }`;
    }

    addBeforeTransform(callback) {
        if (DEBUG) {
            console.log(`${this._logPrefix}.addBeforeTransform`, callback);
        }
        this._beforeTransform.push(callback);
        return this;
    }

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
        var promise = fetch(
            config.api_url(path),
            this._getSettings(
                {
                    type: 'GET',
                    body: data
                }
            ));

        this._beforeTransform.forEach((transform, index) => {
            promise = promise.then(transform);
        });

        return promise.then(response => {
                return response.json()
            })
            .then(json => {
                return json;
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    post(path, data) {
        var promise = fetch(
            config.api_url(path),
            this._getSettings(
                {
                    type: 'POST',
                    body: data
                }
            ));

        this._beforeTransform.forEach((transform, index) => {
            promise = promise.then(transform);
        });

        return promise.then(response => {
                return response.json()
            })
            .then(json => {
                return json;
            })
            .catch(error => {
                this._handleError(error);
            });
    }

    _handleError(error) {
        console.error(`${ this.constructor.name }: ${ error }`);
    }
}

export default new API();
