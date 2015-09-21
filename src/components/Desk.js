import React from 'react';
import Aside from 'components/Aside';

import AuthStore from 'stores/AuthStore';


export class Desk extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.checkLogin();
        AuthStore.addChangeListener(this.checkLogin);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.checkLogin);
    }

    checkLogin = () => {
        if (DEBUG) {
            console.log('Login changed');
        }
        if (! AuthStore.isLoggedIn()) {
            if (DEBUG) {
                console.log(`${ this.constructor.name } User logged out.`);
            }
            this.props.history.pushState(null, '/', null);
        }
    };

    render() {
        return (
            <div className="view-root desk">
                <Aside>
                    {this.props.children.aside}
                </Aside>
                <div className="view-content">
                    {this.props.children.content}
                </div>
            </div>
        );
    }
}

export default Desk;
