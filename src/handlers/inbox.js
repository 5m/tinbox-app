/** @jsx React.DOM */
var $ = require('jquery');
var React = require('react/addons');
var { PageHeader } = require('react-bootstrap');
var { RouteHandler } = require('react-router');

var { ViewContent, Aside } = require('components');
var { InboxContextNav } = require('components/nav/inbox');
var { socker } = require('app');

var { TicketList } = require('components/ticket');


var Inbox = React.createClass({
    getInitialState: function () {
        return {
            tickets: [],
            result: null
        }
    },
    render: function () {
        return (
            <div className="view-root">
                <Aside>
                    <InboxContextNav />
                </Aside>
                <ViewContent />
            </div>
        );
    }
});

module.exports = Inbox;