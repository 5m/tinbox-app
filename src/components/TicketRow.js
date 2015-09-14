var _ = require('lodash');
var moment = require('moment');
var React = require('react');
var Timestamp = require('react-time');

var { api } = require('lib');

var { State, Navigation } = require('react-router');
var { makeSubscriberMixin } = require('mixins/socker');


export class TicketRow extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes: {
        pk: React.PropTypes.string.isRequired,
        subject: React.PropTypes.string.isRequired,
        sender: React.PropTypes.object.isRequired,
        date_created: React.PropTypes.string.isRequired,
        date_modified: React.PropTypes.string.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    handleClick = () => {
        this.context.router.transitionTo(
                `/desk/ticket/${this.props.pk}`);
    };

    render() {
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
}

export default TicketRow;
