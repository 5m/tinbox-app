var React = require('react/addons');
var { State } = require('react-router');

var { api } = require('lib');

var TicketComponent = require('components/ticket').Ticket;


var Ticket = React.createClass({
    mixins: [State],
    getInitialState: function () {
        return {
            ticket: null
        }
    },
    componentDidMount: function () {
        var self = this;

        api.get('/tickets/' + this.getParams().ticketID + '/')
            .then(function (ticket) {
                self.setState({ticket: ticket});
            });
    },
    render: function () {
        if (!this.state.ticket) {
            return (<div>Loading</div>);
        }

        return (
            <TicketComponent {...this.state.ticket} />
        );
    }
});

module.exports = Ticket;