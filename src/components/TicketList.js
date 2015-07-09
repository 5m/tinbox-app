import { TicketRow } from 'components/TicketRow';
import React, { Component } from 'react/addons';

var { api } = require('lib');

var { makeSubscriberMixin } = require('mixins/socker');


export default class TicketList extends Component {
    static mixins = [makeSubscriberMixin('tickets')];
    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    componentDidMount() {
        var self = this;

        api.get('/tickets/')
            .then(function (tickets) {
                self.setState({tickets: tickets});
            });
    }

    render = () => {
        var tickets = this.state.tickets.map(function (ticket) {
            ticket.key = ticket.pk;
            return (<TicketRow {...ticket} />);
        });

        return (
            <div className="container-fluid scrollable">
                <table className="table table-hover ticket-list">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>ID</th>
                            <th>Ämne</th>
                            <th>Frågeställare</th>
                            <th>Grupp</th>
                            <th>Handläggare</th>
                            <th>Inkommet</th>
                            <th>Uppdaterat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets}
                    </tbody>
                </table>
            </div>
        );
    }
}
