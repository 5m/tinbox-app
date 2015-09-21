import React from 'react/addons';
import ReactMixin from 'react-mixin';
import ReactRouter from 'react-router';
import { ButtonInput, Input } from 'react-bootstrap';
import AuthActions from 'actions/AuthActions';
import AuthStore from 'stores/AuthStore';

import DocumentTitle from 'react-document-title';
import View from 'components/View';


@ReactMixin.decorate(React.addons.LinkedStateMixin)
export class Login extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            username: '',
            password: ''
        };
    }

    checkLogin = () => {
        let loggedIn = AuthStore.isLoggedIn();
        DEBUG && console.log(`${this.constructor.name}.checkLogin`,
            loggedIn);

        if (loggedIn) {
            this.props.history.pushState()
            this.props.history.go('/')
        }
    };

    componentDidMount() {
        this.checkLogin();
        AuthStore.addChangeListener(this.checkLogin);
    }
    componentWillUnmount() {
        AuthStore.removeChangeListener(this.checkLogin);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (DEBUG) {
            console.log(
                `${this.constructor.name}.onSubmit: username`,
                this.refs.username);
        }

        AuthActions.authorize(this.state.username, this.state.password);
    };

    render() {
        return (
            <DocumentTitle title="Login">
                <View>
                    <div className="login-component">
                        <form onSubmit={this.onSubmit}>
                            <Input ref="username"
                                   type="text"
                                   label="Email address"
                                   valueLink={this.linkState('username')} />
                            <Input ref="password"
                                   type="password"
                                   label="Password"
                                   valueLink={this.linkState('password') }/>
                            <ButtonInput type="submit" bsStyle="primary"
                                         value="Login" />
                        </form>
                    </div>
                </View>
            </DocumentTitle>
        );
    }
}

export default Login;
