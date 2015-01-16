var config = require('config');
var $ = require('jquery');

var { auth } = require('app');

function get(path, data) {
    return $.ajax(
        config.api_base + path,
        {
            type: 'GET',
            data: data,
            headers: {
                Authorization: [
                    auth.token.token_type,
                    auth.token.access_token
                ].join(' ')
            }
        }
    )
}

function post() {
    return $.ajax(
        config.api_base + path,
        {
            type: 'GET',
            data: data,
            headers: {
                Authorization: [
                    auth.token.token_type,
                    auth.token.access_token
                ].join(' ')
            }
        }
    )
}

module.exports.get = get;
module.exports.post = post;