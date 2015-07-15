var React = require('react/addons');
var queryString = require('query-string');

var { auth } = require('app');
var { Navigation } = require('react-router');
var AuthInfo = require('components/auth-info');


var Default = React.createClass({
    mixins: [Navigation],
    componentDidMount: function () {
        if (window.location.hash) {
            console.log('Got authorization code');
            auth.setAccessToken(queryString.parse(window.location.hash));

            this.transitionTo('/');
        }
    },
    render: function () {
        console.log('Default.render');

        if (window.location.hash) {
            console.log('Logging in');
            return (
                <h1>Logging in</h1>
            );
        }
        return (
            <div className="">
                <AuthInfo />
            </div>
        )
    }
});

module.exports = Default;
