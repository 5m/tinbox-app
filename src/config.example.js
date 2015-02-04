var config = {
    api_base: 'YOUR_TRAK_HOSST' + '/api',
    api_url: function (path) {
        return this.api_base + path;
    },
    auth: {
        base_url: 'YOUR_TRAK_HOST' + '/api/oauth2',
        auth_url: function (path) {
            return this.base_url + path;
        },
        scope: ['read', 'write'],
        client_id: 'YOUR_CLIENT_ID',
        client_secret: 'YOUR_CLIENT_SECRET',
        redirect_uri: 'YOUR_APP_URL'
    }
};

module.exports = config;