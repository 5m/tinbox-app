var _ = require('lodash');
var React = require('react/addons');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var cx = require('components');
var libColor = require('lib/color');

var { Link, RouteHandler, State, Navigation } = Router;
var { Navbar, Nav, NavItem } = ReactBootstrap;

var { LinkNavItem } = require('lib');
var { AuthInfo } = require('components');
var { auth, events } = require('app');

var Trak = React.createClass({
    mixins: [State, Navigation],
    getInitialState: function () {
        var settings = JSON.parse(localStorage.getItem('app-color'));

        return {
            contextNav: null,
            color: settings || {
                appColor: '#333',
                isDark: true
            }
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

        this.setState({color: settings});
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
            backgroundColor: this.state.color.appColor
        };

        var classes = React.addons.classSet({
            'app-root': true,
            'dark': this.state.color.isDark,
            'light': !this.state.color.isDark
        });

        return (
            <div className={classes} style={style}>
                <RouteHandler />
                <cx.color.ColorChooser value={this.state.color.appColor}
                    onChoose={this.handleColorChange} />
            </div>
        )
    }
});

module.exports = Trak;