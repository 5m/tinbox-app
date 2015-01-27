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

        return (
            <tr>
                <td><input type="checkbox" /></td>
                <td>234</td>
                <td>{this.props.subject}</td>
                <td>Bruce Lee</td>
                <td>Kundtjänst</td>
                <td>Joppe Myra</td>
                <td>2014-12-24</td>
                <td>
                    <Timestamp value={created}
                        title={created.format()}
                        relative />
                </td>
            </tr>
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
            <table className="table table-hover">
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
        );
    }
});


_.merge(module.exports, {
    TicketList: TicketList,
    TicketRow: TicketRow
});