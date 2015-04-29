module.exports = require('config_util').configure({
    socker_uri: 'ws://localhost:8765',
    app_base: '', // '' for bare, '/app' for /app/
    api_base: 'YOUR_TRAK_HOSST' + '/api',
    auth: {
        base_url: 'YOUR_TRAK_HOST' + '/api/oauth2',
        client_id: 'YOUR_CLIENT_ID',
        client_secret: 'YOUR_CLIENT_SECRET',
        redirect_uri: 'YOUR_APP_URL'
    }
});