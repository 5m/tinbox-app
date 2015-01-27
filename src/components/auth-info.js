var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var { Auth, api } = require('lib');

var { auth } = require('app');
var { BootstrapMixin, NavItem, DropdownButton, MenuItem } = ReactBootstrap;

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
    handleLogout: function () {
        auth.logOut();
    },
    render: function () {
        if (typeof this.props.auth == 'undefined'
                || !this.props.auth.isAuthenticated) {
            return (
                <a className="btn btn-lg btn-block"
                    href={this.state.authURL}>
                    Log in
                </a>
            );
        }

        if (this.state.user) {
            return (
                <button className="btn btn-lg btn-block">
                    {this.state.user.email}
                    <a onClick={this.handleLogout}>
                        Log out
                    </a>
                </button>
            );
        }

        this.getUserInfo();

        return (
            <button className="btn btn-lg btn-block">Logged in</button>
        );
    }
});

module.exports = AuthInfo;