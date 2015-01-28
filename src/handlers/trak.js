var React = require('react/addons');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');

var { RouteHandler, State, Navigation } = Router;
var { Navbar, Nav, NavItem } = ReactBootstrap;

var { LinkNavItem } = require('lib');
var { AuthInfo } = require('components');
var { auth, events } = require('app');
var { MainNav, ContextNav } = require('components/nav');


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
            <div className="app-root">
                <aside>
                    <header>
                        <button className="btn btn-lg btn-block fg-100">
                            trak
                        </button>
                    </header>

                    <div className="navbars">
                        <MainNav />
                        <ContextNav />
                    </div>
                    <footer>
                        <AuthInfo auth={auth} />
                    </footer>
                </aside>
                <div className="app-content container-fluid">
                    <RouteHandler key={name} />
                </div>
            </div>
        )
    }
});

module.exports = Trak;