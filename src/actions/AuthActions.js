import { STORAGE_KEY } from 'constants/AuthConstants';
import ActionTypes from 'constants/ActionTypes';
import AppDispatcher from 'dispatchers/AppDispatcher';
import RouterContainer from 'services/RouterContainer';

export class AuthActions {
    loginUser(tokenObject) {
        if (DEBUG) {
            console.log(`${ this.constructor.name }.loginUser`, tokenObject);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tokenObject));
        AppDispatcher.dispatch(ActionTypes.AUTH_LOGIN, {token: tokenObject});
    }

    logoutUser() {
        localStorage.removeItem(STORAGE_KEY);
        AppDispatcher.dispatch(ActionTypes.AUTH_LOGOUT);
        //RouterContainer.get().transitionTo('/login');
    }

    updateUserInfo(user) {
        AppDispatcher.dispatch(ActionTypes.AUTH_USERINFO, {user: user});
    }

}


export default new AuthActions();
