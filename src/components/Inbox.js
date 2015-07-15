import React from 'react/addons';
import DocumentTitle from 'react-document-title';


export class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tickets: [], result: null };
    }

    render() {
        return (
            <DocumentTitle title="Inbox">
                <div className="view-root">
                    Inbox
                </div>
            </DocumentTitle>
        );
    }
}

export default Inbox;
