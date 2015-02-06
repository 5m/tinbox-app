var _ = require('lodash');
var React = require('react');
var Timestamp = require('react-time');
var DocumentTitle = require('react-document-title');

var { State, Navigation } = require('react-router');
var { socker } = require('app');
var { SubscriberMixin } = require('mixins/socker');
var Composer = require('components/ticket/composer');
var { MessageList } = require('./message');


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
        var messages = [];

        this.consolidated('threads').map(function (thread) {
            var threadMessages = thread.messages.map(function (m) {
                m.thread = thread;
                return m;
            });
            messages = messages.concat(threadMessages || []);
        });

        messages.sort(function (a, b) {
            return (new Date(a.created)) > (new Date(b.created));
        });

        return (
            <DocumentTitle title={this.props.subject}>
                <section className="ticket">
                    <header className="container-fluid">
                        <div class="row">
                            <div class="col-sm-6">
                                <h1>{this.props.subject}</h1>
                            </div>
                        </div>
                    </header>
                    <MessageList messages={messages} />
                    <footer>
                        <Composer />
                    </footer>
                </section>
            </DocumentTitle>
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


_.merge(module.exports, {
    Ticket: Ticket,
    MessageList: MessageList,
    Thread: Thread,
    TicketList: require('./list').TicketList
});