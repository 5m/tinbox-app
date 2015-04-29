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
    var defaults =  {
        api_url: function (path) {
            return join(this.api_base, path);
        },
        auth: {
            auth_url: function (path) {
                return join(this.base_url, path);
            },
            scope: ['read', 'write']
        }
    };

    return _.merge({}, defaults, settings);
}


module.exports.configure = configure;