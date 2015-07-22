import React from 'react';
import ReactBootstrap from 'react-bootstrap';

import classnames from 'classnames';

import AuthStore from 'stores/AuthStore';


export class AuthInfo extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: this._getUserInfo()
        };
    }

    componentDidMount() {
        AuthStore.addChangeListener(this.onAuthChange);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.onAuthChange);
    }

    onAuthChange = () => {
        this.setState({
            user: this._getUserInfo()
        });
    };

    _getUserInfo() {
        return AuthStore.user;
    }

    getButton() {
        var classes = classnames({
            'btn': true,
            'btn-lg': true,
            'btn-block': true,
            'btn-danger': !this.state.user
        });

        if (this.state.user) {
            return (
                <button className={classes}>
                    {this.state.user.email}
                </button>
            );
        }

        return (
            <button className={classes}>
                No user info
            </button>
        );
    }

    render() {
        var button = this.getButton();

        if (this.state.user) {
        }

        return (
            <div className="auth-info">
                {button}
            </div>
        );
    }
}

export default AuthInfo;
