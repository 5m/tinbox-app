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

    _checkAPIResponse = (response) => {
        if (response.status == 401) {
            if (DEBUG) {
                console.error(
                    `${this.constructor.name}._checkAPIResponse`,
                    'status',
                    response.status);
            }
            throw new Error('');
            this.logout();
        }

        if (response.status == 400) {
            throw new Error('')
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

    login(username, password) {
        if (DEBUG) {
            console.log(`${this.constructor.name}.login: username`, username);
        }
        var api = new APIv2();
        api.url(this.URL('/token/'))
            .post()
            .formData({
                username: username,
                password: password,
                client_id: AuthConstants.CLIENT_ID,
                grant_type: 'password'
            })
            .exec()
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (DEBUG) {
                    console.log(
                        `${this.constructor.name}.login: token response`,
                        response
                    );
                }
                this.handleAuth(response);
            });
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

    getUser() {
        /* DEPRECATED */
        throw new Error('Deprecated');
        this.api.get('/me/')
            .then(function (data) {
                AuthActions.updateUserInfo(data);
            })
    }
}

export default new AuthService();
