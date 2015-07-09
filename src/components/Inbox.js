import { React, Component } from 'react/addons';
import { DocumentTitle } from 'react-document-title';


export default class Inbox extends Component {
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
