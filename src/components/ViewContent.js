import React from 'react';


export class ViewContent extends React.Component {
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
