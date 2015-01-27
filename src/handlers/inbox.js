/** @jsx React.DOM */
var $ = require('jquery');
var React = require('react/addons');
var { PageHeader } = require('react-bootstrap');
var { RouteHandler } = require('react-router');

var { socker } = require('app');
var { api } = require('lib');
var { Socker } = require('socker.js');

var { TicketList } = require('components/ticket');


var Inbox = React.createClass({
    getInitialState: function () {
        return {
            tickets: [],
            result: null
        }
    },
    componentDidMount: function () {
        var self = this;

        api.get('/tickets/')
            .then(function (tickets) {
                self.setState({tickets: tickets});
            });
    },
    render: function () {
        return (
            <RouteHandler tickets={this.state.tickets} />
        );
    }
});

module.exports = Inbox;