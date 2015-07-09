var React = require('react/addons');

var { Link, RouteHandler, State, Navigation } = require('react-router');

var { auth, events } = require('app');

var AuthInfo = require('components/auth-info');
var DeskInfo = require('components/desk-info');
var { MainNav } = require('components/nav');

var Aside = React.createClass({
    render: function () {
        return (
            <aside>
                <header>
                    <DeskInfo />
                </header>

                <div className="navs">
                    <MainNav />
                    {this.props.children}
                </div>

                <footer>
                    <AuthInfo auth={auth} />
                </footer>
            </aside>
        );
    }
});

module.exports = Aside;
module.exports.Aside = Aside;
