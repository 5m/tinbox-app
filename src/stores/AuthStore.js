import ActionTypes from 'constants/ActionTypes';
import BaseStore from 'stores/BaseStore';
import jwt_decode from 'jwt-decode';
import AuthActions from 'actions/AuthActions';
import AuthConstants from 'constants/AuthConstants';

import { APIv2 } from 'lib/api';


class AuthStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this.onDispatch.bind(this));

        this._decoded = null;
        this._token = null;

        this.api = (new APIv2())
            .onResponse(this._checkAPIResponse)
            .onResponse(response => {
                return response.json();
            });
    }

    get user() {
        return this._decoded.user;
    }

    get token() {
        return this._token;
    }

    set token(token) {
        this._token = token;
        this._decoded = jwt_decode(token.access_token);
        this.emitChange()
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
            throw new Error('');
        }

        if (response.status == 400) {
            throw new Error('')
        }
        return response;
    };

    isLoggedIn() {
        if (DEBUG) {
            console.log('AuthStore.isLoggedIn', !!this._token);
        }
        return !!this._token;
    }

    authenticate(username, password) {
        this.api.url('/token/')
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

                this.token = response;
            });
    }

    onDispatch(action) {
        switch (action.type) {
            case ActionTypes.AUTH_LOGIN:
                this.authenticate(action.username, action.password)

                this.storeState();
                this.emitChange();
                break;
            case ActionTypes.AUTH_LOGOUT:
                this._token = null;
                this._user = null;

                this.storeState();
                this.emitChange();
                break;
        }
    }

    storeState() {
        if (this.isLoggedIn()) {
            DEBUG && console.log('Storing logged in state');

            localStorage.setItem(
                AuthConstants.STORAGE_KEY,
                JSON.stringify(this.token));
        } else {
            DEBUG && console.log('Storing logged out state');

            localStorage.removeItem(AuthConstants.STORAGE_KEY)
        }
    }
}

export default new AuthStore();
