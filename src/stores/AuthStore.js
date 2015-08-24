import ActionTypes from 'constants/ActionTypes';
import BaseStore from 'stores/BaseStore';
import jwt_decode from 'jwt-decode';


class AuthStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this.onDispatch.bind(this));

        this._decoded = null;
        this._token = null;
    }

    get user() {
        return this._decoded.user;
    }

    get token() {
        return this._token;
    }

    isLoggedIn() {
        if (DEBUG) {
            console.log('AuthStore.isLoggedIn', !!this._token);
        }
        return !!this._token;
    }

    onDispatch(action) {
        switch (action.type) {
            case ActionTypes.AUTH_LOGIN:
                this._token = action.token;
                this._decoded = jwt_decode(action.token.access_token);

                if (DEBUG) {
                    console.log(
                        `${this.constructor.name}.onDispatch: this._token`,
                        this._token
                    );
                    console.log(
                        `${this.constructor.name}.onDispatch: this._user`,
                        this._decoded
                    );
                }

                this.emitChange();
                break;
            case ActionTypes.AUTH_LOGOUT:
                this._token = null;
                this._user = null;
                this.emitChange();
                break;
        }
    }
}

export default new AuthStore();
