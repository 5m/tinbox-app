import React from 'react/addons';
import DocumentTitle from 'react-document-title';

import TicketStore from 'stores/TicketStore';
import TicketActions from 'actions/TicketActions';

import TicketList from 'components/TicketList';


export class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tickets: [], result: null };
    }

    componentWillMount() {
        DEBUG && console.group('Inbox');
        TicketStore.addChangeListener(this._updateTickets);
        TicketActions.list();
    }

    componentWillUnmount() {
        TicketStore.removeChangeListener(this._updateTickets);
        DEBUG && console.groupEnd();
    }

    _updateTickets = () => {
        this.setState({
            tickets: TicketStore.all()
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
