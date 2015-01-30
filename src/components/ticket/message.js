var moment = require('moment');
var React = require('react');
var Timestamp = require('react-time');
var lib = require('lib');


var MessageList = React.createClass({
    propTypes: {
        messages: React.PropTypes.array.isRequired
    },
    render: function () {
        var timestampedMessages = this.props.messages.map(function (message) {
            message.key = message.uuid;
            var newMessage = {
                key: message.uuid,
                created: message.created,
                from: message.sender.fullname || message.sender.email,
                thread_uuid: message.thread.uuid,
                body: message.body
            };

            return (<TimestampedMessage {...newMessage} />);
        });

        return (
            <div className="messages container-fluid">
                {timestampedMessages}
            </div>
        );
    }
});


var TimestampedMessage = React.createClass({
    propTypes: {
        message: React.PropTypes.object.isRequired
    },
    render: function () {
        var timestamp = this.props.created;

        return (
            <div className="timestamped-message">
                <MessageTimestamp timestamp={timestamp} />
                <Message {...this.props} />
            </div>
        );
    }
});


var MessageTimestamp = React.createClass({
    propTypes: {
        timestamp: React.PropTypes.string.isRequired
    },
    render: function () {
        var timestamp = moment(this.props.timestamp).format('lll');

        return (
            <div className="timestamp">
                <time className="badge"
                    datetime={this.props.timestamp}>
                    {timestamp}
                </time>
            </div>
        );
    }
});


var Message = React.createClass({
    propTypes: {
        body: React.PropTypes.string.isRequired,
        from: React.PropTypes.string.isRequired,
        thread: React.PropTypes.object.isRequired
    },
    render: function () {
        var [r, g, b] = lib.color.UUIDToRGB(
            this.props.thread_uuid,
            {
                s: 1,
                l: 0.7
            }
        );

        var style = {
            borderColor: `rgb(${r}, ${g}, ${b})`
        };

        return (
            <article className="row message thread-1">
                <div className="col-sm-8">
                    <div style={style} className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-comment"></i> {this.props.from}
                        </div>
                        <div className="panel-body">
                            <div className="message-body">
                                {this.props.body}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
})


module.exports.MessageList = MessageList;