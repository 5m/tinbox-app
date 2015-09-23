import config from 'config'
import ActionTypes from 'constants/ActionTypes'
import BaseStore from 'stores/BaseStore'
import jwt_decode from 'jwt-decode'
import AuthActions from 'actions/AuthActions'
import AuthConstants from 'constants/AuthConstants'

import { APIv2 } from 'lib/api'


class AuthStore extends BaseStore {
    constructor() {
        super()
        this.subscribe(() => this.onDispatch.bind(this))

        this._decoded = null
        this._token = null

        this.api = (new APIv2())
            .onResponse(this._checkAPIResponse)
            .onResponse(response => {
                return response.json()
            })
    }

    get user() {
        return this._decoded.user
    }

    get token() {
        return this._token
    }

    set token(token) {
        this._token = token
        this._decoded = jwt_decode(token.access_token)
        this.emitChange()
    }

    _checkAPIResponse = (response) => {
        if (response.status == 401) {
            DEBUG && console.error(
                    `${this.constructor.name}._checkAPIResponse`,
                    'status',
                    response.status)

            throw new Error('HTTP 401, Could not log in.')
        }

        if (response.status == 400) {
            throw new Error('HTTP 400, Could not log in.')
        }
        return response
    }

    isLoggedIn() {
        DEBUG && console.log(`${this.constructor.name}.isLoggedIn`,
            !!this._token)
        return !!this._token
    }

    authenticate(username, password) {
        this.api.url(config.auth.auth_url('/token/'))
            .post()
            .formData({
                username: username,
                password: password,
                client_id: AuthConstants.CLIENT_ID,
                grant_type: 'password'
            })
            .exec()
            .then(response => {
                DEBUG && console.log(
                    `${this.constructor.name}.login: token response`,
                    response)

                this.token = response
                this.storeState()
                this.emitChange()
            })
    }

    onDispatch(action) {
        DEBUG && console.group('AuthStore')
        switch (action.type) {
            case ActionTypes.AUTH_AUTHORIZE:
                this.authenticate(action.username, action.password)

                break
            case ActionTypes.AUTH_LOGOUT:
                this._token = null
                this._user = null

                this.storeState()
                this.emitChange()
                break
            case ActionTypes.AUTH_LOAD_STATE:
                this.loadState()
                break
        }
        DEBUG && console.groupEnd('AuthStore')
    }

    loadState() {
        try {
            let token = JSON.parse(localStorage.getItem(
                AuthConstants.STORAGE_KEY))
            DEBUG && console.log('Loading state, got token', token)
            this.token = token
        } catch (e) {
            console.warn(e)
        }
    }

    storeState() {
        if (this.isLoggedIn()) {
            DEBUG && console.log('Storing logged in state')

            localStorage.setItem(
                AuthConstants.STORAGE_KEY,
                JSON.stringify(this.token))
        } else {
            DEBUG && console.log('Storing logged out state')

            localStorage.removeItem(AuthConstants.STORAGE_KEY)
        }
    }
}

export default new AuthStore()
