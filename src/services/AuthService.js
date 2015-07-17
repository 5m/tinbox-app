import _ from 'lodash';
import querystring from 'querystring';
import url from 'url';
import { join } from 'path';

import { API } from 'lib/api';

import AuthConstants from 'constants/AuthConstants';
import AuthActions from 'actions/AuthActions';


export class AuthService {
    constructor() {
        this.api = new API();
        this.api.addBeforeTransform(this._checkAPIResponse);
    }

    _checkAPIResponse = (response) => {
        if (response.status == 401) {
            if (DEBUG) {
                console.error(
                    `${this.constructor.name}._checkAPIResponse`,
                    'status',
                    response.status);
            }
            this.logout();
        }
        return response;
    };

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

        console.log('urlObj', urlObj);

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
        this.getUser();
    }

    getUser() {
        this.api.get('/me/')
            .then(function (data) {
                AuthActions.updateUserInfo(data);
            })
    }
}

export default new AuthService();
