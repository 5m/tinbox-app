import config from 'config';

export default {
    STORAGE_KEY: 'tinbox-auth',
    CLIENT_ID: config.auth.client_id,
    CLIENT_SECRET: config.auth.client_secret,
    OAUTH_SCOPE: config.auth.scope,
    REDIRECT_URI: config.auth.redirect_uri,
    API_BASE: config.auth.base_url
};
