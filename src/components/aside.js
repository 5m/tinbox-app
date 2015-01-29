var React = require('react/addons');

var { Link, RouteHandler, State, Navigation } = require('react-router');

var { auth, events } = require('app');

var AuthInfo = require('components/auth-info');
var { MainNav } = require('components/nav');

var Aside = React.createClass({
    render: function () {
        return (
            <aside>
                <header>
                    <Link to="app" className="btn btn-lg btn-block">
                        trak
                    </Link>
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