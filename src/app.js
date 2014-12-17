var sock = require('./sock');

module.exports = {
    sock: new sock.Sock('ws://localhost:8765')
};