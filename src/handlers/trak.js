var React = require('react/addons');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var cx = require('components');
var libColor = require('lib/color');

var { RouteHandler, State, Navigation } = Router;
var { Navbar, Nav, NavItem } = ReactBootstrap;

var { LinkNavItem } = require('lib');
var { AuthInfo } = require('components');
var { auth, events } = require('app');
var { MainNav, ContextNav } = require('components/nav');


var Trak = React.createClass({
    mixins: [State, Navigation],
    getInitialState: function () {

        var settings = JSON.parse(localStorage.getItem('app-color'));

        return settings || {
            appColor:  '#333',
            isDark: true
        }
    },
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
    handleColorChange: function (color) {
        var settings = {
            appColor: color,
            isDark: libColor.isDark(color)
        };

        localStorage.setItem('app-color', JSON.stringify(settings));

        this.setState(settings);
    },
    goHome: function () {
        this.transitionTo('/');
    },
    render: function () {
        var name = this.getRoutes().reverse()[0].name;

        if (!auth.isAuthenticated) {
            return (<div>Redirecting...</div>);
        }

        var style = {
            backgroundColor: this.state.appColor
        };

        var classes = React.addons.classSet({
            'app-root': true,
            'dark': this.state.isDark,
            'light': !this.state.isDark
        });

        return (
            <main className={classes} style={style}>
                <div className="trak-root">
                    <aside>
                        <header>
                            <button className="btn btn-lg btn-block">
                                trak
                            </button>
                        </header>

                        <div className="navs">
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
                <cx.color.ColorChooser value={this.state.appColor}
                    onChoose={this.handleColorChange} />
            </main>
        )
    }
});

module.exports = Trak;