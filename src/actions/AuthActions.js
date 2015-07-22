import { STORAGE_KEY } from 'constants/AuthConstants';
import ActionTypes from 'constants/ActionTypes';
import AppDispatcher from 'dispatchers/AppDispatcher';
import RouterContainer from 'services/RouterContainer';

export class AuthActions {
    loginUser(jwt) {
        var stored_token = JSON.stringify(jwt);

        if (DEBUG) {
            console.log(`${ this.constructor.name }.loginUser`, jwt);
            console.log(
                `${ this.constructor.name }.loginUser: storing token as`,
                stored_token);
        }

        localStorage.setItem(STORAGE_KEY, stored_token); // TODO: Move to store
        AppDispatcher.dispatch(ActionTypes.AUTH_LOGIN, {token: jwt});
    }

    logoutUser() {
        localStorage.removeItem(STORAGE_KEY); // TODO: Move to store
        AppDispatcher.dispatch(ActionTypes.AUTH_LOGOUT);
        //RouterContainer.get().transitionTo('/login');
    }

    updateUserInfo(user) {
        AppDispatcher.dispatch(ActionTypes.AUTH_USERINFO, {user: user});
    }

}


export default new AuthActions();
