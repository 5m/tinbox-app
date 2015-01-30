var React = require('react/addons');

var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');

var cx = require('components');
var hx = require('handlers');

var { TicketList } = require('components/ticket');

var {
    State,
    Route,
    Link,
    Navigation,
    DefaultRoute,
    RouteHandler,
    Redirect } = Router;

var Root = React.createClass({
    render: function () {
        return (<RouteHandler />);
    }
});

var routes = (
    <Route handler={Root} path="/">
        <Route handler={hx.Trak} name="app">
            <Route name="inbox"
                   handler={hx.Inbox}
                   addHandlerKey={true}>
                <Route name="ticket" path=":ticketID" handler={hx.Ticket} />
                <DefaultRoute name="ticketList" handler={TicketList} />
            </Route>
            <Redirect from="/inbox" to="inbox" />
            <Route name="account" handler={hx.Account} />
        </Route>
        <DefaultRoute handler={hx.Default} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.body);
});

try {
    window.jQuery = require('jquery');
    require('bootstrap-sass-official/assets/javascripts/bootstrap');
} catch (e) {
    console.error(e);
}