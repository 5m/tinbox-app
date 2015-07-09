var classnames = require('classnames');
var React = require('react');
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
            title,
            children } = this.props;

        var classes = {
                'active': active,
                'disabled': disabled
            };

        return (
            <li className={classnames(this.props.className, classnames(classes))}>
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
