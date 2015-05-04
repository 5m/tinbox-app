var _ = require('lodash');
var $ = require('jquery');

var config = require('config');

var { auth } = require('app');

function _getSettings(additionalSettings) {
    additionalSettings = additionalSettings || {};

    var headers = {};

    if (auth.token) {
        headers = {
            Authorization: [
                auth.token.token_type,
                auth.token.access_token
            ].join(' ')
        };
    }

    return _.merge(
        {},
        {
            error: [auth.jqXHRErrorHandler.bind(auth)],
            headers: headers
        },
        additionalSettings
    );
}

function get(path, data) {
    return $.ajax(
        config.api_url(path),
        _getSettings(
            {
                type: 'GET',
                data: data
            }
        )
    )
}

function post(path, data) {
    return $.ajax(
        config.api_url(path),
        _getSettings(
            {
                type: 'POST',
                data: data
            }
        )
    )
}

module.exports.get = get;
module.exports.post = post;