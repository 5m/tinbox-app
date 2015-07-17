import ActionTypes from 'constants/ActionTypes';
import BaseStore from 'stores/BaseStore';


class AuthStore extends BaseStore {
    constructor() {
        super();
        this.subscribe(() => this.onDispatch.bind(this));

        this._user = null;
        this._token = null;
    }

    getUser() {
        return this._user;
    }

    getToken() {
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
                this.emitChange();
                break;
            case ActionTypes.AUTH_USERINFO:
                this._user = action.user;
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
