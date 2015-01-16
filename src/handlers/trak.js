var React = require('react/addons');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');

var lib = require('lib');

var { RouteHandler, State, Navigation } = Router;
var { LinkNavItem } = lib;
var { Navbar, Nav } = ReactBootstrap;
var { AuthInfo } = require('components');
var { auth } = require('app');


var Trak = React.createClass({
    mixins: [State, Navigation],
    componentDidMount: function () {
        if (!auth.isAuthenticated) {
            this.transitionTo('/');
        }
    },
    render: function () {
        var name = this.getRoutes().reverse()[0].name;

        if (!auth.isAuthenticated) {
            return (<div>Redirecting...</div>);
        }
        return (
            <div>
                <Navbar>
                    <Nav>
                        <LinkNavItem to="inbox">
                            Inbox
                        </LinkNavItem>
                        <LinkNavItem to="settings">
                            Settings
                        </LinkNavItem>
                    </Nav>
                    <Nav className="pull-right">
                        <AuthInfo auth={auth} />
                    </Nav>
                </Navbar>
                <RouteHandler key={name} />
            </div>
        )
    }
});

module.exports = Trak;