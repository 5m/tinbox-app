import { STORAGE_KEY } from 'constants/AuthConstants';
import ActionTypes from 'constants/ActionTypes';
import AppDispatcher from 'dispatchers/AppDispatcher';
import RouterContainer from 'services/RouterContainer';

export class AuthActions {
    login(username, password) {
        AppDispatcher.dispatch(ActionTypes.AUTH_LOGIN, {username, password});
    }

    loadState() {
        AppDispatcher.dispatch(ActionTypes.AUTH_LOAD_STATE);
    }

    logoutUser() {
        AppDispatcher.dispatch(ActionTypes.AUTH_LOGOUT);
    }
}


export default new AuthActions();
