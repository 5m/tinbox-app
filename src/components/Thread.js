var _ = require('lodash');
var React = require('react');
var Timestamp = require('react-time');
var DocumentTitle = require('react-document-title');
var Composer = require('components/ticket/composer');

var { State, Navigation } = require('react-router');
var { socker } = require('app');
var { SubscriberMixin } = require('mixins/socker');
var { MessageList } = require('./message');


export const Thread = React.createClass({
    mixins: [SubscriberMixin],

    getInitialState: function () {
        return {
            messages: []
        };
    },

    componentDidMount: function () {
        this.subscribe(['thread', this.props.pk, 'message', '*'], 'messages');
    },

    render: function () {
        var messages = this.consolidated('messages').map(function (message) {
            message.key = message.pk;
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
