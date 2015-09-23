var _ = require('lodash')
var url = require('url')

/**
 * Makeshift path join
 */
function join(base, path) {
    // strip slash from base
    var base = base.slice(-1) == '/' ? base.slice(0, -1) : base
    // assure slash in path
    var path = path.slice(0, 1) !== '/' ? '/' + path : path

    return base + path
}

function makeAbsolute(_url) {
    console.group('makeAbsolute')

    console.trace()
    console.log('before', _url)
    var parsed = url.parse(_url)

    if (typeof window !== 'undefined' && !parsed.hostname) {
        _url = url.resolve(window.location.href, _url);
    }
    console.log('after', _url)

    console.groupEnd('makeAbsolute')
    return _url;
}

function configure(settings) {
    var config = {}

    var defaults =  {
        api_url: function (path) {
            return makeAbsolute(join(config.api_base, path));
        },
        auth: {
            auth_url: function (path) {
                return makeAbsolute(join(config.auth.base_url, path))
            },
            scope: ['read', 'write']
        }
    };

    var config = _.merge(config, defaults, settings)

    if (typeof window !== "undefined" &&
            // <not starts with 'ws'>
            !(config.socker_uri.indexOf('ws') == 0)) {
        config.socker_uri = 'ws://' + window.location.host + config.socker_uri
    }

    return config
}


module.exports.configure = configure
