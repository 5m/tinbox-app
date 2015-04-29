var _ = require('lodash');

/**
 * Makeshift path join
 */
function join(base, path) {
    // strip slash from base
    var base = base.slice(-1) == '/' ? base.slice(0, -1) : base;
    // assure slash in path
    var path = path.slice(0) !== '/' ? '/' + path : path;

    return base + path;
}

function configure(settings) {
    var config = {};

    var defaults =  {
        api_url: function (path) {
            return join(config.api_base, path);
        },
        auth: {
            auth_url: function (path) {
                return join(config.auth.base_url, path);
            },
            scope: ['read', 'write']
        }
    };

    return _.merge(config, defaults, settings);
}


module.exports.configure = configure;