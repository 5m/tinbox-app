var React = require('react/addons');
var { Nav, Navbar } = require('react-bootstrap');

var MainNav = React.createClass({
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
                        <i className="fa fa-tags"></i>
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

var ContextNav = React.createClass({
    render: function () {
        return (
            <Nav stacked className="nav-context">
                <li>
                    <a href="#">
                        Inkorgen
                        <span className="badge">1337</span>
                    </a>
                </li>
                <li>
                    <a href="#">Olösta ärenden</a>
                </li>
                <li className="parent active">
                    <a href="#">
                        <i className="fa fa-caret-right"></i>
                    </a>
                    <a href="#">Ej tilldelade</a>
                </li>
                <li className="parent">
                    <a href="#">
                        <i className="fa fa-caret-right"></i>
                    </a>
                    <a href="#">
                        Uppdaterade
                        <span className="badge">42</span></a>
                </li>
                <li>
                    <a href="#">Väntande</a></li>
                <li className="parent">
                    <a href="#">
                        <i className="fa fa-caret-right"></i>
                    </a>
                    <a href="#">Arkiverade</a>
                </li>
            </Nav>
        )
    }
});

module.exports.MainNav = MainNav;
module.exports.ContextNav = ContextNav;