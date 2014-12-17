var React = require('react');
var sock = require('./sock');

var HelloWorld = require('./components/hello.coffee');

React.render(React.createElement(HelloWorld), document.body);

module.exports = {
    sock: new sock.Sock('ws://localhost:8765')
};