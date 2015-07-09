import React, { Component } from 'react';
var classnames = require('classnames');

var { TicketStore } = require('stores/TicketStore');
var MessageActionCreators = require('actions/MessageActionCreators');

var { Panel, Input } = require('react-bootstrap');

export class Composer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyIn: null,
            values: {}
        };
    }

    handleChange(field, value) {
        var values = this.state.values;

        console.log('Updating', field, value);

        values[field] = value;
        this.setState({values: values});
    }

    onSubmit(e) {
        e.preventDefault();

        MessageActionCreators.createMessage(body, this.state.replyIn);
    }

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
                        onChange={this.handleChange.bind(this, 'private')}>
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
                              value={this.state.values.body}
                              onChange={this.handleChange} />
                </Panel>
            </form>
        );
    }
}


var CheckboxLock = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        title: React.PropTypes.string
    },
    handleChange: function (e) {
        var value = e.target.checked;
        console.log(this, value);
        this.props.onChange(value);
    },
    render: function () {
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
});


module.exports = Composer;
