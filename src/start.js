var config = require('config');
import React from 'react/addons';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { Router, Route, DefaultRoute, Redirect } from 'react-router';

import TrakApp from 'components/TrakApp';
import Login from 'components/Login';
import Authorize from 'components/Authorize';
import Desk from 'components/Desk';

import TicketList from 'components/TicketList';
import Inbox from 'components/Inbox';
import Ticket from 'components/Ticket';
import InboxContentNav from 'components/InboxContentNav';

import RouterContainer from 'services/RouterContainer';

import AuthService from 'services/AuthService';
import AuthConstants from 'constants/AuthConstants';

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

var router = (
    <Router history={new BrowserHistory()}>
        <Route component={TrakApp}
               path={basePath}>
            <Route path="desk/"
                components={Desk}>
                <Route path="inbox"
                       components={{content: Inbox, aside: InboxContentNav}} />
                <Route path="ticket/:ticketPK"
                       components={{content: Ticket, aside: InboxContentNav}} />
            </Route>
            <Route path="login"
                   component={Login} />
            <Route path="authorize"
                   component={Authorize} />
        </Route>
    </Router>
);
/*
router.addTransitionHook((nextState, transition, error) => {
    console.log('TRANSITION', nextState, transition, error)
});
*/

RouterContainer.set(router);

var stored_token = localStorage.getItem(AuthConstants.STORAGE_KEY);
if (stored_token) {
    AuthService.handleAuth(JSON.parse(stored_token));
}

React.render(router, document.body);
