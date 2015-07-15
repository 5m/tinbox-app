var React = require('react/addons');
var { Link, State, Navigation } = require('react-router');

var api = require('lib/api');

var DeskInfo = React.createClass({
    getInitialState: function () {
        return {
            desk: null
        }
    },
    componentDidMount: function () {
        var self = this;
        /*
        api.get('/desks/')
            .then(function (response) {
                if (!response.active) {
                    console.error('No active desk');
                    return;
                }

                self.setState({desk: response.active});
            })
        */
    },
    render: function () {
        var info;

        if (this.state.desk) {
            info = (
                <Link to="app" className="btn btn-lg btn-block">
                    <img src={this.state.desk.logo} /> {this.state.desk.name}
                </Link>
            );
        } else {
            info = (
                <Link to="app" className="btn btn-lg btn-block">
                    trak
                </Link>
            );
        }
        return info;
    }
});

module.exports = DeskInfo;
