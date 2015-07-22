import React from 'react';


export class View extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        before: React.PropTypes.node,
        after: React.PropTypes.node
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="view-root">
                {this.props.before}
                <div className="view-content">
                    {this.props.children}
                </div>
                {this.props.after}
            </div>
        );
    }
}

export default View;
