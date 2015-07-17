import React from 'react/addons';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router';

export default class InboxContentNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Nav stacked className="nav-context">
                <li className="active">
                    <Link to="/desk/inbox">
                        Inkorgen
                        <span className="badge">1337</span>
                    </Link>
                </li>
                <li>
                    <Link to="inbox">Olösta ärenden</Link>
                </li>
                <li className="parent">
                    <a href="#">
                        <i className="fa fa-caret-right"></i>
                    </a>
                    <Link to="inbox">Ej tilldelade</Link>
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
}
