import BrowserHistory from 'react-router/lib/BrowserHistory';
import React from 'react/addons';
//import { routes } from 'routes';
var config = require('config');

var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
import { Router, Route, DefaultRoute, Redirect } from 'react-router';
import { Account, Default } from 'handlers';

import Trak from 'handlers/trak';
import TicketList from 'components/TicketList';
import Inbox from 'components/Inbox';
import Ticket from 'components/Ticket';
import InboxContentNav from 'components/InboxContentNav';
import { ViewContent } from 'components/view-content';
/*
React.render((
    <Router history={BrowserHistory}>
        <Route component={Trak}
               path={config.app_base + '/'}>
            <Route path="inbox"
                   component={Inbox}>
                <Route path=":ticketID"
                       components={{content: Ticket, aside: InboxContentNav}} />
                <DefaultRoute
                    name="ticketList"
                    components={{content: TicketList, aside: InboxContentNav}} />
            </Route>
            <Redirect from="/inbox" to="inbox" />
            <Route path="account" component={Account} />
            <DefaultRoute component={Default} />
        </Route>
    </Router>
), document.body);
*/

const basePath = config.app_base + '/';
console.log('basePath', basePath);
console.log('Trak', Trak);
console.log('Ticket', Ticket);
console.log('Inbox', Inbox);
console.log('InboxContentNav', InboxContentNav);

React.render((
    <Router history={new BrowserHistory()}>
        <Route component={Trak}
               path={basePath}>
            <Route path="inbox"
                   components={{content: Inbox, aside: InboxContentNav}} />
            <Route path=":ticketID"
                   components={{content: Ticket, aside: InboxContentNav}} />
        </Route>
    </Router>
), document.body);



try {
    //require('bootstrap-sass-official/assets/javascripts/bootstrap');
} catch (e) {
    console.error(e);
}
