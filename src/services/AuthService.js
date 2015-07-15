import _ from 'lodash';
import querystring from 'querystring';
import url from 'url';
import { join } from 'path';

import api from 'lib/api';

import AuthConstants from 'constants/AuthConstants';
import AuthActions from 'actions/AuthActions';


export class AuthService {
    URL(path=null, params=null) {
        var urlObj = url.parse(AuthConstants.API_BASE,
            {parseQueryString: true});

        if (path) {
            urlObj.pathname = join(urlObj.pathname, path);
        }

        if (params) {
            urlObj.query = _.merge({}, urlObj.query, params);
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
        AuthActions.logoutUser();
    }

    handleAuth(tokenObject) {
        AuthActions.loginUser(tokenObject);
        this.getUser();
    }

    getUser() {
        api.get('/me/')
            .then(function (data) {
                AuthActions.updateUserInfo(data);
            })
    }
}

export default new AuthService();
