/** @jsx React.DOM */
var React = require('react');
var { sock } = require('app');

var { PageHeader } = require('react-bootstrap');


var Inbox = React.createClass({
    getInitialState: function () {
        return {
            result: null
        }
    },
    componentDidMount: function () {
        var self = this;

        sock.on('hello', function (data, message) {
            self.setState({response: message.toString()});
        });

        sock.emit('hello', {foo: 'bar'});
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