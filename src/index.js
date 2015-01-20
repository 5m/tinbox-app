var React = require('react/addons');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');
var components = require('components');

var { Default, Trak, Inbox, Ticket } = require('handlers');
var { TicketList } = require('components/ticket');

var { State, Route, Link, Navigation, DefaultRoute, RouteHandler } = Router;

var Root = React.createClass({
    render: function () {
        return (<RouteHandler />);
    }
});

var routes = (
    <Route handler={Root} path="/">
        <Route handler={Trak} name="app" path="/app">
            <Route name="inbox"
                   handler={Inbox}
                   addHandlerKey={true}>
                <Route name="ticket" path=":ticketID" handler={Ticket} />
                <DefaultRoute name="ticketList" handler={TicketList} />
            </Route>
        </Route>
        <DefaultRoute handler={Default} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.body);
});