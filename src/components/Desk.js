import React from 'react';
import { Aside } from 'components';


export class Desk extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        AuthStore.addChangeListener(this.onLoginChange);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.onLoginChange);
    }

    onLoginChange = () => {
        console.log('Login changed');
    };

    render() {
        return (
            <div className="view-root">
                <Aside>
                    {this.props.aside}
                </Aside>
                <div className="view-content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default Desk;
