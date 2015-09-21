import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Timestamp from 'react-time';

import ReactMixin from 'react-mixin';
import { History } from 'react-router';


@ReactMixin.decorate(History)
export class TicketRow extends React.Component {
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
        this.history.pushState(
            null,
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
