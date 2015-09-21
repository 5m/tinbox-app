export class TinboxService {
    constructor() {
        this.headers = {};
    }

    get(path, params=null, options={}) {
        options.method = 'GET';

        return this.ajax(path, options)
    }

    ajax(path, params={}) {
        let defaults = {method='GET', params=null, body=null};
        let options = {...defaults, ...params};

        return fetch(
            path,
            options
        )
    }
}


function getURL(path) {
    return config.api_url(path);
}
