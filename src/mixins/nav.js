import 'classnames';
var React = require('react/addons');


var ContextNavMixin = {
    componentWillMount: function () {
        this.links = [];
    },
    addLink: function (link) {
        this.links.push(link);
    },
    render: function () {
        var links = this.links.map(function (link) {
            var classes = classnames({
                parent: link.parent,
                active: link.active
            });

            return (
                <li className={classes}>
                    {link}
                </li>
            )
        });

        return (
            <Nav stacked className="nav-context">
                {links}
            </Nav>
        );
    }
};

module.exports.ContextNavMixin = ContextNavMixin;
