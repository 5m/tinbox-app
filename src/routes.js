import React, { Component } from 'react';
import Router, { Route, DefaultRoute, Redirect } from 'react-router';
import { Inbox } from 'components/Inbox';
import { ViewContent } from 'components/view-content';
import { InboxContentNav } from 'components/inbox';

var config = require('config');

var hx = require('handlers');

var { TicketList } = require('components/ticket');


export const routes = (
    <Route handler={hx.Trak}
           path={config.app_base + '/'}>
        <Route path="inbox"
               component={Inbox}>
            <Route path=":ticketID"
                   components={{content: hx.Ticket, aside: InboxContentNav}} />
            <DefaultRoute
                name="ticketList"
                components={{content: TicketList, aside: InboxContentNav}} />
        </Route>
        <Redirect from="/inbox" to="inbox" />
        <Route path="account" component={hx.Account} />
        <DefaultRoute component={hx.Default} />
    </Route>
);
