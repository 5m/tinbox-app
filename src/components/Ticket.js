import _ from 'lodash';
import React from 'react/addons';
import DocumentTitle from 'react-document-title';

import TicketStore from 'stores/TicketStore';
import TicketService from 'services/TicketService';

import Composer from 'components/MessageComposer';
import { MessageList } from 'components/message';


export default class Ticket extends React.Component {
    static propTypes = {
        ticketPK: React.PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            ticket: null
        };
    }

    componentDidMount() {
        TicketService.getTickets();
        this._updateTicket();
        TicketStore.addChangeListener(this._updateTicket);
    }

    componentWillUnmount() {
        TicketStore.removeChangeListener(this._updateTicket);
    }

    _updateTicket = () => {
        this.setState({
            ticket: TicketStore.getTicket(
                this.props.routeParams.ticketPK)
        });
    };

    render() {
        var messages = [];

        if (this.state.ticket) {
            this.state.ticket.threads.forEach((thread) => {
                messages = messages.concat(thread.messages);
            });
        }

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
                        <Composer />
                    </footer>
                </section>
            </DocumentTitle>
        );
    }
}
