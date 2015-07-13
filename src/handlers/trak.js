import _ from 'lodash';

import Router, { Link } from 'react-router';
import React, { Component } from 'react/addons';
import ReactBootstrap from 'react-bootstrap';

import { isDark } from 'lib/color';
import { Aside } from 'components';
import { ColorChooser } from 'components/color';

import Default from 'handlers/default';

import InboxContentNav from 'components/InboxContentNav';
import TicketList from 'components/TicketList';


var classnames = require('classnames');

var { auth, events } = require('app');


export class Trak extends Component {
    constructor(props) {
        super(props);
        var settings = JSON.parse(localStorage.getItem('app-color'));
        this.state = {
            contextNav: null,
            color: settings || {
                appColor: '#333',
                isDark: true
            }
        };
    }
    componentDidMount() {
        var self = this;

        events.on('auth.loggedout', function (e) {
            console.warn('Logged out', e);
            self.goHome();
        })
    }
    handleColorChange = (color) => {
        var settings = {
            appColor: color,
            isDark: isDark(color)
        };

        localStorage.setItem('app-color', JSON.stringify(settings));

        this.setState({color: settings});
    };

    goHome() {
        this.context.router.transitionTo('/');
    }

    render() {
        console.log('Trak.render, isAuthenticated', auth.isAuthenticated);
        if (!auth.isAuthenticated) {
            return (<Default />);
        }

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
                <div className="view-root">
                    <Aside>
                        {this.props.aside || <InboxContentNav />}
                    </Aside>
                    <div className="view-content">
                        {this.props.content || <TicketList />}
                    </div>
                </div>
                <ColorChooser value={this.state.color.appColor}
                    onChoose={this.handleColorChange} />
            </div>
        )
    }
}

Trak.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Trak;
