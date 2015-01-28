var $ = require('jquery');
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
        $(document).on('keydown', this.onKey);
    },
    componentWillUnmount: function () {
        $(document).off('keydown', this.onKey)
    },
    onKey: function (e) {
        console.log('down', e.key, e.code, e.altKey, e);

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
        var classes = React.addons.classSet({
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