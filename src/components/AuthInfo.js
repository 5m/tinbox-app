import classnames from 'classnames';
import React from 'react';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router';

import AuthStore from 'stores/AuthStore';


export class AuthInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.updateUserInfo();
        AuthStore.addChangeListener(this.onAuthChange);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.onAuthChange);
    }

    onAuthChange = () => {
        this.updateUserInfo();
    };

    getUserInfo() {
        var user = AuthStore.user;
        DEBUG && console.log(`${this.constructor.name}.getUserInfo: user`,
            user);
        return user;
    }

    updateUserInfo() {
        this.setState({
            user: this.getUserInfo()
        })
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
                <Link to="/logiN">Log in</Link>
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
