import React, { Component } from 'react';
import MessageActions from 'actions/MessageActions';
import TicketStore from 'stores/TicketStore';
import { Panel, Input } from 'react-bootstrap';

var classnames = require('classnames');


export class MessageComposer extends Component {
    static propTypes = {
        replyIn: React.PropTypes.string
    };

    constructor(props) {
        super(props);

        console.log('props', props);
        this.state = {
            replyIn: props.replyIn,
            values: {}
        };
    }

    updateField(field) {
        var values = this.state.values;

        console.log('Updating', field, value);

        values[field] = value;
        this.setState({values: values});
    }

    link(field) {
        return {
            value: this.state.values[field],
            requestChange: (value) => {
                var values = this.state.values;

                console.log('Updating', field, value);

                values[field] = value;
                this.setState({values: values});
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        MessageActions.createMessage(
            this.state.values.body,
            this.props.replyIn);
    };

    render() {
        var formFooter = (
            <ul className="nav nav-pills">
                <li>
                    <button type="submit"
                            className="btn btn-primary">
                        <i className="fa fa-send"></i>
                        Skicka + <i className="fa fa-archive"></i>
                    </button>
                </li>
                <li>
                    <button type="submit"
                            className="btn btn-default">
                        <i className="fa fa-send"></i> Skicka
                    </button>
                </li>
                <li>
                    <button type="button"
                            className="btn btn-default tool"
                            title="Bifoga">
                        <i className="fa fa-paperclip"></i>
                    </button>
                </li>
                <li>
                    <CheckboxLock
                        name="private"
                        title="Private"
                        value={this.state.values.private}
                        onChange={this.updateField.bind(this, 'private')}>
                    </CheckboxLock>
                </li>
            </ul>
        );

        var classes = classnames({
            'compose': true,
            'compose-private': this.state.values.private
        });
        return (
            <form className={classes}
                  onSubmit={this.onSubmit}>
                <Panel footer={formFooter}>
                    <textarea className="form-control"
                              ref="textarea"
                              rows="4"
                              valueLink={this.link('body')} />
                </Panel>
            </form>
        );
    }
}

export class CheckboxLock extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        title: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    handleChange(e) {
        var value = e.target.checked;
        console.log(this, value);
        this.props.onChange(value);
    }

    render() {
        return (
            <div className="btn btn-default tool tr-btn-lock"
                title={this.props.title}>
                <input type="checkbox"
                       id={this.props.name}
                       value={this.props.value}
                       name={this.props.name}
                       onChange={this.handleChange}/>
                <label htmlFor={this.props.name}>{this.props.children}</label>
            </div>
        );
    }
}

export default MessageComposer;
