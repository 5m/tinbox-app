import _ from 'lodash';

import Router, { Link } from 'react-router';
import React, { Component } from 'react/addons';
import ReactBootstrap from 'react-bootstrap';

import AuthStore from 'stores/AuthStore';

import { isDark } from 'lib/color';
import { ColorChooser } from 'components/color';

import Default from 'handlers/default';

import InboxContentNav from 'components/InboxContentNav';
import TicketList from 'components/TicketList';


var classnames = require('classnames');

var { auth, events } = require('app');


export class TrakApp extends Component {
    static propTypes = {
        children: React.PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        var settings = JSON.parse(localStorage.getItem('app-color'));

        var state = {
            color: settings || {
                appColor: '#333',
                isDark: true
            }
        };
        var loginState = this._getLoginState();

        this.state = { ...loginState, ...state};
    }

    _getLoginState() {
        var loginState = {
            userLoggedIn: AuthStore.isLoggedIn()
        };

        if (DEBUG) {
            console.log(`${ this.constructor.name }._getLoginstate`,
                loginState);
        }
        return loginState;
    }

    componentDidMount() {
        AuthStore.addChangeListener(this.onLoginChange);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.onLoginChange);
    }

    onLoginChange = () => {
        this.setState(this._getLoginState());
    };

    handleColorChange = (color) => {
        var settings = {
            appColor: color,
            isDark: isDark(color)
        };

        localStorage.setItem('app-color', JSON.stringify(settings));

        this.setState({color: settings});
    };

    render() {
        var style = {
            backgroundColor: this.state.color.appColor
        };

        var classes = classnames({
            'app-root': true,
            'dark': this.state.color.isDark,
            'light': !this.state.color.isDark
        });

        return (
            <div className={classes} style={style}>
                {this.props.children}
                <ColorChooser value={this.state.color.appColor}
                    onChoose={this.handleColorChange} />
            </div>
        )
    }
}

export default TrakApp;
