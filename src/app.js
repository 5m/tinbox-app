var socker = require('./socker');
var Auth = require('./lib/auth');
var config = require('config');

module.exports = {
    socker: new socker.Socker('ws://localhost:8765'),
    auth: new Auth(config.auth)
};