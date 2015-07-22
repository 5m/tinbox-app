import React from 'react/addons';
import ReactMixin from 'react-mixin';
import ReactRouter from 'react-router';
import { ButtonInput, Input } from 'react-bootstrap';
import AuthService from 'services/AuthService';

import DocumentTitle from 'react-document-title';
import View from 'components/View';

export class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            username: '',
            password: ''
        };
    }
    componentDidMount() {
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (DEBUG) {
            console.log(
                `${this.constructor.name}.onSubmit: username`,
                this.refs.username);
        }

        AuthService.login(this.state.username, this.state.password);
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

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);

export default Login;
