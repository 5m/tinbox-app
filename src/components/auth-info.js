var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var { Auth, api } = require('lib');

var { auth } = require('app');
var { BootstrapMixin, NavItem, DropdownButton, MenuItem } = ReactBootstrap;

var AuthInfo = React.createClass({
    mixins: [BootstrapMixin],
    componentDidMount: function () {
        this.getUserInfo();
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
    handleLogout: function () {
        auth.logOut();
    },
    getButton: function () {
        var buttonClass = 'btn btn-lg btn-block';
        if (typeof this.props.auth == 'undefined'
                || !this.props.auth.isAuthenticated) {
            return (
                <a className={buttonClass}
                    href={this.state.authURL}>
                    Log in
                </a>
            );
        }

        if (this.state.user) {
            return (
                <button className={buttonClass}>
                    {this.state.user.email}
                </button>
            );
        }

        return (
            <button className={buttonClass}>
                Logging in...
            </button>
        );
    },
    render: function () {
        var button = this.getButton();
        var context;

        if (this.state.user) {
        }

        return (
            <div className="auth-info">
                {button}
                {context}
            </div>
        );
    }
});


module.exports = AuthInfo;