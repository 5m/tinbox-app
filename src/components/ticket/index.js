var _ = require('lodash');
var moment = require('moment');
var React = require('react');
var Timestamp = require('react-time');
var DocumentTitle = require('react-document-title');

var { State, Navigation } = require('react-router');
var { socker } = require('app');
var { SubscriberMixin } = require('mixins/socker');
var Composer = require('components/ticket/composer');


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
            <DocumentTitle title={this.props.subject}>
                <div className="ticket">
                    <h1>{this.props.subject}</h1>
                    <MessageList />
                    <Composer />
                    <div className="threads">
                        {threads}
                    </div>
                </div>
            </DocumentTitle>
        );
    }
});


var MessageList = React.createClass({
    render: function () {
        return (
            <div className="messages container-fluid">
                <div className="timestamp"><time className="badge">2015-01-01 12:00</time></div>

                <article className="row message thread-1">
                    <div className="col-sm-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <i className="fa fa-comment"></i>
                                Bruce Lee
                            </div>
                            <div className="panel-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="timestamp"><time className="badge">2015-01-01 12:00</time></div>

                <article className="row message thread-1">
                    <div className="col-sm-8 col-sm-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <i className="fa fa-reply"></i>
                                Kundtjänst
                                <span className="pull-right text-muted">
                                    <i className="fa fa-envelope-o"></i> Bruce Lee
                                </span>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="timestamp"><time className="badge">2015-01-01 12:00</time></div>

                <article className="row message note">
                    <div className="col-sm-8 col-sm-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <p>
                                    Crazy customer
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="timestamp"><time className="badge">2015-01-01 12:00</time></div>

                <article className="row message thread-2">
                    <div className="col-sm-8 col-sm-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <i className="fa fa-comment"></i>
                                Kundtjänst
                                <span className="pull-right text-muted">
                                    <i className="fa fa-envelope-o"></i> Acme
                                </span>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="timestamp"><time className="badge">2015-01-01 12:00</time></div>

                <article className="row message thread-2">
                    <div className="col-sm-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <i className="fa fa-reply"></i>
                                Acme
                            </div>
                            <div className="panel-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="timestamp"><time className="badge">2015-01-01 12:00</time></div>

                <article className="row message thread-1">
                    <div className="col-sm-8 col-sm-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <i className="fa fa-reply"></i>
                                Kundtjänst
                                <div className="pull-right">
                                    <strong>Till:</strong>
                                    <span className="badge address pull-right">
                                        Bruce Lee
                                    </span>
                                </div>
                            </div>
                            <div className="panel-body">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
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
    Message: Message,
    Thread: Thread,
    TicketList: require('./list').TicketList
});