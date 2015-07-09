var log = require('loglevel');
var events = require('lib/events');


class Auth {
    constructor(config) {
        this.config = config;
        this.isAuthenticated = false;

        // Key to use when storing state in the browser
        this.storageKey = 'trak-app-auth';

        this.loadAuth();  // Try to load auth
    }

    getAuthURL() {
        return this.config.auth_url('/authorize/')
            + '?response_type=' + encodeURIComponent('token')
            + '&client_id=' + encodeURIComponent(this.config.client_id)
            + '&scope=' + encodeURIComponent(this.config.scope.join(' '))
            + '&redirect_uri=' + encodeURIComponent(this.config.redirect_uri);
    }

    setAccessToken(tokenObject) {
        this.token = tokenObject;
        this.isAuthenticated = true;
        this.saveAuth();
    }

    setAuthorizationCode(code) {
        log.debug('Got authorization code', code);
        this.fetchAccessToken(code);
    }

    fetchAccessToken(code) {
        // Not used
        var self = this;
        return $.post(
            this.config.auth_url('/token/'),
            {
                grant_type: 'authorization_code',
                code: code,
                client_id: self.config.client_id,
                scope: self.config.scope.join(' ')
            })
            .then(function (data) {

            });
    }

    authenticate() {

    }

    jqXHRErrorHandler(jqXHR, status, error) {
        console.log('$.ajax error', jqXHR, status, error);
        if (status != 'error') {
            return;
        }

        if (jqXHR.status == 401) {
            // TODO: Handle this more gracefully
            this.logOut();
        }
    }

    logOut(reason) {
        this.isAuthenticated = false;
        localStorage.removeItem(this.storageKey);

        events.emit('auth.loggedout', {reason: reason});
    }

    saveAuth() {
        console.log('Saving', this.token);
        localStorage.setItem(this.storageKey, JSON.stringify(this.token));
    }

    loadAuth() {
        try {
            this.token = JSON.parse(localStorage.getItem(this.storageKey));
            console.log('Loaded', this.token);
            this.isAuthenticated = true;  // TODO: Better checking
        } catch (e) {
            console.warn('Could not load token from storage');
        }
    }
}

module.exports = Auth;
