var React = require('react/addons');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var components = require('components');
var lib = require('lib');

var { LinkNavItem } = lib;
var { Navbar, Nav } = ReactBootstrap;

var { State, Route, RouteHandler, Link, Navigation } = Router;

var Trak = React.createClass({
    mixins: [State],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;

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
                </Navbar>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="example">
                    <RouteHandler key={name} />
                </ReactCSSTransitionGroup>
            </div>
        )
    }
});

var routes = (
    <Route handler={Trak}>
        <Route name="inbox" handler={components.Inbox} addHandlerKey={true} />
        <Route name="settings" handler={components.Settings} addHandlerKey={true} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});