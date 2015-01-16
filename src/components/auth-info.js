var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var { Auth, api } = require('lib');

var { auth } = require('app');
var { BootstrapMixin, NavItem } = ReactBootstrap;

var AuthInfo = React.createClass({
    mixins: [BootstrapMixin],
    componentDidMount: function () {
        this.setState({
            authURL: auth.getAuthURL()
        });
    },
    getInitialState: function () {
        return {
            authURL: '#',
            user: null
        };
    },
    getDefaultProps: function () {
        return {
            auth: undefined
        };
    },
    getUserInfo: function () {
        var self = this;
        api.get('/me/')
            .then(function (data) {
                console.log('got data', data);
                self.setState({user: data});
            })
    },
    render: function () {
        if (typeof this.props.auth == 'undefined'
                || !this.props.auth.isAuthenticated) {
            return (
                <NavItem href={this.state.authURL}>Log in</NavItem>
            );
        }

        if (this.state.user) {
            return (
                <NavItem>{this.state.user.email}</NavItem>
            );
        }

        this.getUserInfo();

        return (
            <NavItem>Logged in</NavItem>
        );
    }
});

module.exports = AuthInfo;