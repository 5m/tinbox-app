var _ = require('lodash');
var moment = require('moment');
var React = require('react');
var Timestamp = require('react-time');

var { State, Navigation } = require('react-router');
var { socker } = require('app');
var { SubscriberMixin } = require('mixins/socker');


var TicketRow = React.createClass({
    mixins: [State, Navigation],

    propTypes: {
        subject: React.PropTypes.string,
        created: React.PropTypes.string,
        confirmed: React.PropTypes.bool
    },

    handleClick: function () {
        this.transitionTo('ticket', {ticketID: this.props.uuid});
    },

    render: function () {
        var created = moment(this.props.created);
        var cx = React.addons.classSet;
        var classes = cx({
            'ticket': true,
        });

        return (
            <div className={classes}
                 onClick={this.handleClick}>
                <div className="title">
                    {this.props.subject}
                </div>
                <div className="created">
                    <Timestamp value={created}
                        title={created.format()}
                        relative/>
                </div>
            </div>
        );
    }
});


var TicketList = React.createClass({
    mixins: [SubscriberMixin],

    componentDidMount: function () {
        this.subscribe('ticket.*', 'tickets');
    },

    render: function () {
        var tickets = this.consolidated('tickets').map(function (ticket) {
            ticket.key = ticket.uuid;
            return (<TicketRow {...ticket} />);
        });

        return (
            <div className="ticket-list">
                {tickets}
            </div>
        );
    }
});


var Ticket = React.createClass({
    mixins: [SubscriberMixin],

    getInitialState: function () {
        return {
            threads: []
        };
    },

    componentDidMount: function () {
        this.subscribe(['ticket', this.props.uuid, 'thread', '*'], 'threads');
    },

    render: function () {
        var allThreads = this.state.threads.concat(this.props.threads);
        var threads = allThreads.map(function (thread) {
            thread.key = thread.uuid;
            return (<Thread {...thread} />);
        });

        return (
            <div className="ticket">
                <h1>{this.props.subject}</h1>
                <div className="threads">
                    {threads}
                </div>
            </div>
        );
    }
});


var Thread = React.createClass({
    mixins: [SubscriberMixin],

    getInitialState: function () {
        return {
            messages: []
        };
    },

    componentDidMount: function () {
        this.subscribe(['thread', this.props.uuid, 'message', '*'], 'messages');
    },

    render: function () {
        var messages = this.consolidated('messages').map(function (message) {
            message.key = message.uuid;
            return (<Message {...message} />);
        });

        var contacts = this.props.contacts.map(function (contact) {
            return (<li key={contact.email}>{contact.email}</li>);
        });

        return (
            <div className="thread">
                <ul className="contacts">
                    {contacts}
                </ul>
                {messages}
            </div>
        );
    }
});


var Message = React.createClass({
    render: function () {
        return (
            <div className="message">
                <div className="sender">
                    {this.props.sender.email}
                </div>
                <pre className="body">
                    {this.props.body}
                </pre>
            </div>
        );
    }
});


_.merge(module.exports, {
    Ticket: Ticket,
    TicketRow: TicketRow,
    TicketList: TicketList,
    Message: Message,
    Thread: Thread
});