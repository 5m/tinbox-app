import React from 'react';
import Aside from 'components/Aside';

import AuthStore from 'stores/AuthStore';


export class Desk extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
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
            this.context.router.transitionTo('/');
        }
    };

    render() {
        return (
            <div className="view-root">
                <Aside>
                    {this.props.aside}
                </Aside>
                <div className="view-content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default Desk;
