var classnames = require('classnames');
var React = require('react/addons');
var ColorPicker = require('react-color-picker');

var ColorChooser = React.createClass({
    getInitialState: function () {
        return {
            currentColor: '#333',
            visible: false
        };
    },
    getDefaultProps: function () {
        return {
            onChoose: function () { console.warn('No onChoose handler'); }
        }
    },
    componentDidMount: function () {
        document.addEventListener('keydown', this.onKey);
    },
    componentWillUnmount: function () {
        document.removeEventListener('keydown', this.onKey);
    },
    onKey: (e) => {
        if (!e.altKey) {
            return;
        }

        if (e.keyCode == 67) {
            this.setState({visible: !this.state.visible});
        }
    },
    onDrag: function (color, c) {
        console.log(color, c);
        this.props.onChoose(color);

        this.setState({currentColor: color});
    },
    render: function () {
        var classes = classnames({
            hidden: !this.state.visible,
            'color-picker': true
        });

        return (
            <div className={classes}>
                <ColorPicker value={this.props.value}
                    onDrag={this.onDrag} />
            </div>
        );
    }
});

module.exports.ColorChooser = ColorChooser;
