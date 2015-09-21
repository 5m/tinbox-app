import React from 'react';
import { Link } from 'react-router';

import AuthInfo from 'components/AuthInfo';

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="view-root home">
                <div className="container">
                    <div className="col-sm-12">
                        <h1>Home
                            <div className="pull-right">
                                <AuthInfo />
                            </div>
                        </h1>
                        <ul>
                            <li><Link to="/desk/inbox">Inbox</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;
