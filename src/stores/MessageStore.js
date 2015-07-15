import BaseStore from 'stores/BaseStore';


export class MessageStore extends BaseStore {
    items = [];

    constructor() {
        super();
        this.subscribe(this.onDispatch.bind(this));
    }
    onDispatch(action) {

    }
}


export default MessageStore;
