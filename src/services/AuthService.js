import _ from 'lodash';
import querystring from 'querystring';
import url from 'url';
import { join } from 'path';

import { APIv2 } from 'lib/api';

import AuthConstants from 'constants/AuthConstants';
import AuthActions from 'actions/AuthActions';


export class AuthService {
    constructor() {
        this.api = (new APIv2())
            .onResponse(this._checkAPIResponse)
            .onResponse(response => {
                return response.json();
            });
    }

    URL(path=null, params=null) {
        var urlObj = url.parse(AuthConstants.API_BASE,
            {parseQueryString: true});

        if (path) {
            urlObj.pathname = join(urlObj.pathname, path);
        }

        if (params) {
            var uOq = urlObj.query;
            urlObj.query = {...uOq, ...params};
        }

        if (DEBUG) {
            console.log(`${this.constructor.name}.URL: urlObj`, urlObj);
        }

        return url.format(urlObj);
    }

    getLoginURL() {
        var query = {
            response_type: 'token',
            client_id: AuthConstants.CLIENT_ID,
            scope: AuthConstants.OAUTH_SCOPE.join(' '),
            redirect_uri: AuthConstants.REDIRECT_URI
        };

        return this.URL('/authorize/', query);
    }


    logout() {
        if (DEBUG) {
            console.log(`${ this.constructor.name }.logout`);
        }
        AuthActions.logoutUser();
    }

    handleAuth(tokenObject) {
        AuthActions.loginUser(tokenObject);
        // this.getUser();
    }
}

export default new AuthService();
