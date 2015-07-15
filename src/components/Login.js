import React from 'react/addons';
import ReactRouter from 'react-router';
import { Button } from 'react-bootstrap';
import AuthService from 'services/AuthService';

export class Login extends React.Component {
    componentDidMount() {
        this.setState({
            loginURL: AuthService.getLoginURL()
        })
    }

    onClick = () => {
        window.location = this.state.loginURL;
    };

    render() {
        return (
            <div className="login">
                <Button bsStyle="primary" onClick={this.onClick}>
                    Login
                </Button>
            </div>
        );
    }
}

export default Login;
