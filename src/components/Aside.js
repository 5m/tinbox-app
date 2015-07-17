var React = require('react/addons');

var { Link, RouteHandler, State, Navigation } = require('react-router');

var { auth, events } = require('app');

import AuthInfo from 'components/AuthInfo';
import DeskInfo from 'components/DeskInfo';
import MainNav from 'components/MainNav';


export const Aside = React.createClass({
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

export default Aside;
