var $ = require('jquery');
var log = require('loglevel');


class Auth {
    constructor(config) {
        this.config = config;
        this.isAuthenticated = false;
        this.loadAuth();  // Try to load auth
    }
    getAuthURL() {
        return this.config.auth_url('/authorize/')
            + '?response_type=' + encodeURIComponent('token')
            + '&client_id=' + encodeURIComponent(this.config.client_id)
            + '&scope=' + encodeURIComponent(this.config.scope.join(' '));
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
        var self = this;
        $.post(
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
    saveAuth() {
        console.log('Saving', this.token);
        localStorage.setItem('trak-app', JSON.stringify(this.token));
    }
    loadAuth() {
        try {
            this.token = JSON.parse(localStorage.getItem('trak-app'));
            console.log('Loaded', this.token);
            this.isAuthenticated = true;  // TODO: Better checking
        } catch (e) {
            console.warn('Could not load token from storage');
        }
    }
}

module.exports = Auth;