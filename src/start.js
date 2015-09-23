import config from 'config';

import React from 'react/addons';
import { createHistory, useBasename } from 'history';
import { Router, Route, Redirect, IndexRoute } from 'react-router';

import AuthActions from 'actions/AuthActions';

import TrakApp from 'components/TrakApp';
import Login from 'components/Login';
import Desk from 'components/Desk';

import TicketList from 'components/TicketList';
import Inbox from 'components/Inbox';
import Ticket from 'components/Ticket';
import InboxContentNav from 'components/InboxContentNav';
import Home from 'components/Home';

import RouterContainer from 'services/RouterContainer';


const history = useBasename(createHistory)({
    basename: config.app_base
});

const basePath = config.app_base + '/';

const router = (
    <Router history={history}>
        <Route component={TrakApp}
               path="/">
            <IndexRoute component={Home} />
            <Route path="desk/"
                components={Desk}>
                <Route path="inbox"
                       components={{content: Inbox, aside: InboxContentNav}} />
                <Route path="ticket/:ticketPK"
                       components={{content: Ticket, aside: InboxContentNav}} />
            </Route>
            <Route path="login"
                   component={Login} />
            <Route path="*" component={TrakApp} />
        </Route>
    </Router>
);

RouterContainer.set(router);

AuthActions.loadState();

React.render(router, document.body);
