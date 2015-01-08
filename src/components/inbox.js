/** @jsx React.DOM */
var React = require('react/addons');
var { socker } = require('app');
var { Socker } = require('socker');

var { PageHeader } = require('react-bootstrap');


var Inbox = React.createClass({
    getInitialState: function () {
        return {
            result: null
        }
    },
    componentDidMount: function () {
        var self = this;
        this.socker = new Socker('ws://localhost:8765/joar');

        this.socker.on('hello', function (data, message) {
            self.setState({response: message.toString()});
        });

        this.socker.emit('hello', {foo: 'bar'});
    },
    render: function () {
        return (
            <div className="container">
                <PageHeader>Inbox</PageHeader>
                <div className="row">
                    <div className="col-sm-12">
                        <pre>{this.state.response}</pre>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Inbox;