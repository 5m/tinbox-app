var React = require('react/addons');
var { Nav } = require('react-bootstrap');
var { Link } = require('react-router');


export const MainNav = React.createClass({
    render: function () {
        return (
            <Nav stacked className="nav-main">
                <li className="active">
                    <a href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Inkorg">
                        <i className="fa fa-inbox"></i>
                    </a>
                </li>
                <li>
                    <a href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Etiketter">
                        <i className="fa fa-life-ring"></i>
                    </a>
                </li>
                <li>
                    <a href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Inställningar">
                        <i className="fa fa-cog"></i>
                    </a>
                </li>
            </Nav>
        );
    }
});


export default MainNav;

module.exports.MainNav = MainNav;
