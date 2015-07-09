var _ = require('lodash');
var moment = require('moment');
var React = require('react');
var Timestamp = require('react-time');

var { api } = require('lib');

var { State, Navigation } = require('react-router');
var { socker } = require('app');
var { makeSubscriberMixin } = require('mixins/socker');


var TicketRow = React.createClass({
    mixins: [State, Navigation],

    propTypes: {
        subject: React.PropTypes.string.isRequired,
        sender: React.PropTypes.object.isRequired,
        date_created: React.PropTypes.string.isRequired,
        date_modified: React.PropTypes.string.isRequired
    },

    handleClick: function () {
        this.transitionTo('ticket', {ticketID: this.props.pk});
    },

    render: function () {
        var created = moment(this.props.date_created);
        var modified = moment(this.props.date_modified);

        return (
            <tr onClick={this.handleClick}>
                <td><input type="checkbox" /></td>
                <td>234</td>
                <td>{this.props.subject}</td>
                <td>{this.props.sender.display_name}</td>
                <td>Kundtjänst</td>
                <td>Joppe Myra</td>
                <td>
                    <Timestamp value={created}
                        title={created.format()}
                        relative />
                </td>
                <td>
                    <Timestamp value={modified}
                        title={modified.format()}
                        relative />
                </td>
            </tr>
        );
    }
});

