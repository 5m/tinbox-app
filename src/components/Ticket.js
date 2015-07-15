import _ from 'lodash';
import React from 'react/addons';
var Timestamp = require('react-time');
var DocumentTitle = require('react-document-title');
var Composer = require('components/MessageComposer');

var { State, Navigation } = require('react-router');
var { SubscriberMixin } = require('mixins/socker');
var { MessageList } = require('components/ticket/message');


export default class Ticket extends React.Component {
    static mixins = [SubscriberMixin];
    constructor(props) {
        super(props);
        this.state = {
            threads: []
        };

    }

    componentDidMount() {
        this.subscribe(['ticket', this.props.pk, 'thread', '*'], 'threads');
    }

    render() {
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
                        <div className="row">
                            <div className="col-sm-6">
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
}
