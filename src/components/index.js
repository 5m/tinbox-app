var _ = require('lodash');

_.merge(module.exports, {
    Ticket: require('./ticket'),
    color: require('./color'),
    Aside: require('./aside'),
    ViewContent: require('./view-content'),
    InboxContextNav: require('./nav/inbox')
});