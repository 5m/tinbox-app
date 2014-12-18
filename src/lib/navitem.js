var React = require('react');
var classSet = require('react-bootstrap/utils/classSet');
var joinClasses = require('react-bootstrap/utils/joinClasses');
var { BootstrapMixin } = require('react-bootstrap');
var { Link } = require('react-router');

var LinkNavItem = React.createClass({
    mixins: [BootstrapMixin],

    propTypes: {
        onSelect: React.PropTypes.func,
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        href: React.PropTypes.string,
        title: React.PropTypes.string,
        eventKey: React.PropTypes.any
    },

    getDefaultProps: function () {
        return {
            href: '#'
        };
    },

    render: function () {
        var {
            disabled,
            active,
            href,
            title,
            children,
            ...props } = this.props,
            classes = {
                'active': active,
                'disabled': disabled
            };

        return (
            <li {...props}
                className={joinClasses(props.className, classSet(classes))}>
                <Link
                    to={this.props.to}
                    title={title}
                    ref="anchor">
                { children }
                </Link>
            </li>
        );
    },

    handleClick: function (e) {
        if (this.props.onSelect) {
            e.preventDefault();

            if (!this.props.disabled) {
                this.props.onSelect(this.props.eventKey, this.props.href);
            }
        }
    }
});

module.exports = LinkNavItem;