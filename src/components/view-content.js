var React = require('react/addons');
var { RouteHandler } = require('react-router');

var ViewContent = React.createClass({
    render: function () {
        return (
            <div className="view-content">
                <RouteHandler />
            </div>
        );
    }
});

module.exports = ViewContent;
