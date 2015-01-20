var React = require('react/addons');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');

var lib = require('lib');

var { RouteHandler, State, Navigation } = Router;
var { LinkNavItem } = lib;
var { Navbar, Nav } = ReactBootstrap;
var { AuthInfo } = require('components');
var { auth, events } = require('app');


var Trak = React.createClass({
    mixins: [State, Navigation],
    componentDidMount: function () {
        var self = this;

        if (!auth.isAuthenticated) {
            this.goHome();
        }

        events.on('auth.loggedout', function (e) {
            console.warn('Logged out', e);
            self.goHome();
        })
    },
    goHome: function () {
        this.transitionTo('/');
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