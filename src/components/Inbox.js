import React from 'react/addons';
import DocumentTitle from 'react-document-title';

import TicketService from 'services/TicketService';
import TicketStore from 'stores/TicketStore';
import TicketList from 'components/TicketList';


export class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tickets: [], result: null };
    }

    componentWillMount() {
        TicketService.getTickets();
        TicketStore.addChangeListener(this._updateTickets);
    }

    componentWillUnmount() {
        TicketStore.removeChangeListener(this._updateTickets);
    }

    _updateTickets = () => {
        this.setState({
            tickets: TicketStore.getTickets()
        });
    };

    render() {
        return (
            <DocumentTitle title="Inbox">
                <TicketList tickets={this.state.tickets} />
            </DocumentTitle>
        );
    }
}

export default Inbox;
