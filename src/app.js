var socker = require('./socker');

module.exports = {
    socker: new socker.Socker('ws://localhost:8765')
};