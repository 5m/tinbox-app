var React = require('react/addons');
var { ContextNavMixin } = require('mixins/nav');


var Account = React.createClass({
    componentDidMount: function () {
        this.props.setContextNav(AccountContextNav);
    },
    render: function () {
        return (
            <div className="account">
                <h1>Account</h1>
            </div>
        );
    }
});

var AccountContextNav = React.createClass({
    mixins: [ContextNavMixin],
    componentWillMount: function () {
        this.addLink(
            <Link to="inbox">
                Test
            </Link>
        );
    }
});

module.exports = Account;