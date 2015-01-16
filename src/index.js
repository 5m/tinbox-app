var React = require('react/addons');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');
var components = require('components');

var { Default, Trak, Inbox } = require('handlers');

var { State, Route, Link, Navigation, DefaultRoute, RouteHandler } = Router;

var Root = React.createClass({
    render: function () {
        return (<RouteHandler />);
    }
});

var routes = (
    <Route handler={Root} path="/">
        <Route handler={Trak} name="app" path="/app">
            <Route name="inbox" handler={Inbox} addHandlerKey={true} />
            <Route name="settings" handler={components.Settings} addHandlerKey={true} />
            <Route name="login" handler={components.Login} />
        </Route>
        <DefaultRoute handler={Default} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    console.log('Dispatching', Handler);
    React.render(<Handler />, document.body);
});