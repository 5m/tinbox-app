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
            <div className="ticket"
                 onClick={this.handleClick}>
                <div className="title">
                    {this.props.subject}
                </div>
                <div className="created">
                    <Timestamp value={created}
                        title={created.format()}
                        relative/>
                </div>
            </div>
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
            <div className="ticket-list">
                {tickets}
            </div>
        );
    }
});


_.merge(module.exports, {
    TicketList: TicketList,
    TicketRow: TicketRow
});