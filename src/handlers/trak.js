var React = require('react/addons');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');

var lib = require('lib');

var { RouteHandler, State, Navigation } = Router;
var { LinkNavItem } = lib;
var { Navbar, Nav, NavItem } = ReactBootstrap;
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
            <div className="app-root">
                <aside>
                    <header>
                        <button className="btn btn-lg btn-block">
                            trak
                        </button>
                    </header>

                    <div className="navbars">
                        <nav className="navbar-default navbar-vertical navbar-main">
                            <Nav className="navbar-nav">
                                <li className="active">
                                    <a href="#"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Inkorg">
                                        <i className="fa fa-inbox"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Etiketter">
                                        <i className="fa fa-tags"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Inställningar">
                                        <i className="fa fa-cog"></i>
                                    </a>
                                </li>
                            </Nav>
                        </nav>
                        <nav className="navbar navbar-default navbar-vertical navbar-context">
                            <Nav className="navbar-nav">
                                <li>
                                    <a href="#">
                                        Inkorgen
                                        <span className="badge">1337</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">Olösta ärenden</a>
                                </li>
                                <li className="parent active">
                                    <a href="#">
                                        <i className="fa fa-caret-right"></i>
                                    </a>
                                    <a href="#">Ej tilldelade</a>
                                </li>
                                <li className="parent">
                                    <a href="#">
                                        <i className="fa fa-caret-right"></i>
                                    </a>
                                    <a href="#">
                                        Uppdaterade
                                        <span className="badge">42</span></a>
                                </li>
                                <li>
                                    <a href="#">Väntande</a></li>
                                <li className="parent">
                                    <a href="#">
                                        <i className="fa fa-caret-right"></i>
                                    </a>
                                    <a href="#">Arkiverade</a>
                                </li>
                            </Nav>
                        </nav>
                    </div>
                    <footer>
                        <AuthInfo auth={auth} />
                    </footer>
                </aside>
                <div className="container-fluid">
                    <RouteHandler key={name} />
                </div>
            </div>
        )
    }
});

module.exports = Trak;