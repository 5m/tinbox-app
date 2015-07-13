var classnames = require('classnames');
var React = require('react/addons');
var ColorPicker = require('react-color-picker');

export class ColorChooser extends React.Component {
    static defaultProps = {
        onChoose: function () {
            console.warn('No onChoose handler');
        }
    };

    state = {
        currentColor: '#333',
        visible: false
    };

    componentDidMount() {
        document.addEventListener('keydown', this.onKey);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
    }

    onKey = (e) => {
        if (!e.altKey) {
            return;
        }

        if (e.keyCode == 67) {
            this.setState({visible: !this.state.visible});
        }
    };

    onDrag = (color, c) => {
        console.log(color, c);
        this.props.onChoose(color);

        this.setState({currentColor: color});
    };

    render() {
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
}

export default ColorChooser;

