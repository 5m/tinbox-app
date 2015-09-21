import _ from 'lodash';

import Router, { Link } from 'react-router';
import React, { Component } from 'react/addons';
import ReactBootstrap from 'react-bootstrap';

import AuthStore from 'stores/AuthStore';

import { isDark } from 'lib/color';
import { ColorChooser } from 'components/color';

import InboxContentNav from 'components/InboxContentNav';
import TicketList from 'components/TicketList';


var classnames = require('classnames');


export class TrakApp extends Component {
    static propTypes = {
        children: React.PropTypes.object
    };

    constructor(props) {
        super(props);

        var settings = JSON.parse(localStorage.getItem('app-color'));

        var state = {
            color: settings || {
                appColor: '#333',
                isDark: true
            }
        };

        this.state = {...state};
    }

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
            <main className={classes} style={style}>
                {this.props.children}
                <ColorChooser value={this.state.color.appColor}
                    onChoose={this.handleColorChange} />
            </main>
        )
    }
}

export default TrakApp;
