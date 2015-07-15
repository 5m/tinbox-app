import querystring from 'querystring';

import React from 'react/addons';
import ReactRouter from 'react-router';

import AuthService from 'services/AuthService';
import AuthStore from 'stores/AuthStore';

export class Authorize extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        if (window.location.hash) {
            AuthService.handleAuth(
                querystring.parse(window.location.hash.slice(1)));
        }
        AuthStore.addChangeListener(this.onLoginChange);
    }

    onLoginChange = () => {
        if (AuthStore.isLoggedIn()) {
            this.context.router.transitionTo('/');
        }
    };

    render() {
        return (
            <div className="authorize">
                Logging you in...
            </div>
        );
    }
}

export default Authorize;
