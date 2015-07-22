import 'whatwg-fetch';
import _ from 'lodash';
import url from 'url';
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

        if (AuthStore.token) {
            _.merge(headers, {
                Authorization: [
                    'Bearer',
                    AuthStore.token
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

    _makeURL(path) {
        var obj = url.parse(path);

        if (!obj.hostname) {
            return config.api_url(path);
        }

        return path;
    }

    get(path, params) {
        var _url = new URL(this._makeURL(path));
        Object.keys(params).forEach(key => {
            _url.searchParams.append(key, params[key]);
        });
        var promise = fetch(
            _url,
            this._getSettings(
                {
                    method: 'GET',
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

    post(path, data=null) {
        var promise = fetch(
            this._makeURL(path),
            this._getSettings(
                {
                    method: 'POST',
                    body: data ? JSON.stringify(data) : undefined
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

export class APIv2 {
    constructor() {
        this._onResponse = [];
        this._headers = [];
        this.request_url = null;
        this.request = {
            headers: {}
        };
    }

    _makeURL(path) {
        var obj = url.parse(path);

        if (!obj.hostname) {
            return config.api_url(path);
        }

        return path;
    }

    globalHeader(key, value) {
        this._headers[key] = value;
        return this;
    }

    headers(headers) {
        Object.keys(headers).forEach(key => {
            this.request.headers[key] = headers[key];
        });
        return this;
    }

    url(url_, params={}) {
        this.request_url = new URL(this._makeURL(url_));

        Object.keys(params).forEach(key => {
            this.request_url.searchParams.append(key, params[key]);
        });

        return this;
    }

    get() {
        this.request.method = 'GET';
        return this;
    }

    post() {
        this.request.method = 'POST';
        return this;
    }

    formData(data) {
        this.request.body = new FormData();

        Object.keys(data).forEach(key => {
            this.request.body.append(key, data[key]);
        });
        return this;
    }

    bodyJSON(data) {
        this.request.body = JSON.stringify(data);
        return this
    }

    onResponse(callback) {
        this._onResponse.push(callback);
        return this;
    }

    exec() {
        this.request.headers = Object.assign(
            {},
            this._headers,
            this.request.headers);

        if (DEBUG) {
            console.log(`${this.constructor.name}.exec: settings`,
                this.request);
        }

        var promise = fetch(
            this.request_url,
            this.request);

        this._onResponse.forEach(callback => {
            promise = promise.then(callback);
        });

        this.request_url = null;
        this.request = {
            headers: {}
        };

        return promise;
    }
}


export default new API();
