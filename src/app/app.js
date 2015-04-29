var _ = require('lodash');
var socker = require('socker.js');
var Auth = require('lib/auth');
var config = require('config');
var events = require('lib/events');

_.merge(module.exports, {
    events: events,
    socker: new socker.Socker(config.socker_uri),
    auth: new Auth(config.auth)
});