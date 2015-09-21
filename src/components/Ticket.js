import _ from 'lodash';
import React from 'react/addons';
import DocumentTitle from 'react-document-title';

import TicketActions from 'actions/TicketActions';
import TicketStore from 'stores/TicketStore';
import TicketService from 'services/TicketService';

import Composer from 'components/MessageComposer';
import { MessageList } from 'components/message';


export default class Ticket extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            ticket: null
        };
    }

    componentDidMount() {
        DEBUG && console.group(this.constructor.name);
        TicketActions.get(this.props.routeParams.ticketPK);

        this.updateTicket();
        TicketStore.addChangeListener(this.updateTicket);
    }

    componentWillUnmount() {
        TicketStore.removeChangeListener(this.updateTicket);
        DEBUG && console.groupEnd(this.constructor.name);
    }

    updateTicket = () => {
        this.setState({
            ticket: TicketStore.get(this.props.routeParams.ticketPK)
        });
    };

    render() {
        var messages = [];

        var lastThreadPK = null;

        if (this.state.ticket) {
            this.state.ticket.threads.forEach((thread) => {
                messages = messages.concat(thread.messages);
                lastThreadPK = thread.pk;
            });
        }
        console.log(`${this.constructor.name} lastThreadPK`, lastThreadPK);

        messages.sort(function (a, b) {
            return (new Date(a.created)) > (new Date(b.created));
        });

        var subject = 'Loading...';

        if (this.state.ticket) {
            subject = this.state.ticket.subject;
        }

        return (
            <DocumentTitle title={subject}>
                <section className="ticket">
                    <header className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <h1>{subject}</h1>
                            </div>
                        </div>
                    </header>
                    <MessageList messages={messages} />
                    <footer>
                        <Composer replyIn={lastThreadPK} />
                    </footer>
                </section>
            </DocumentTitle>
        );
    }
}
