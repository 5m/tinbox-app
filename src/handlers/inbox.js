/** @jsx React.DOM */
var $ = require('jquery');
var React = require('react/addons');
var { socker } = require('app');
var { api } = require('lib');
var { Socker } = require('socker');

var { PageHeader } = require('react-bootstrap');


var Inbox = React.createClass({
    getInitialState: function () {
        return {
            tickets: [],
            result: null
        }
    },
    componentDidMount: function () {
        var self = this;

        this.socker = new Socker('ws://localhost:8765/joar');

        this.socker.on('ticket.*', function (ticket) {
            self.setState({tickets: [ticket].concat(self.state.tickets)});
        });

        api.get('/tickets/')
            .then(function (tickets) {
                self.setState({tickets: tickets});
            });
    },
    render: function () {
        var tickets = this.state.tickets.map(function (ticket) {
            return (<Ticket key={ticket.uuid} {...ticket} />);
        });
        return (
            <div className="container">
                <PageHeader>Inbox</PageHeader>
                <div className="row">
                    <div className="col-sm-12">
                        {tickets}
                    </div>
                </div>
            </div>
        );
    }
});

var Ticket = React.createClass({
    render: function () {
        return (
            <div className="ticket">
                <div className="title">
                    {this.props.subject}
                </div>
                <div className="created">
                    <time dateTime={this.props.created}>
                        {this.props.created}
                    </time>
                </div>
            </div>
        )
    }
});

module.exports = Inbox;