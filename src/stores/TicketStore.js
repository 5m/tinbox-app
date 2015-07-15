import BaseStore from 'stores/BaseStore';


export class TicketStore extends BaseStore {
    items = [];

    constructor() {
        super();
        this.subscribe(() => this.onDispatch.bind(this));
    }
    onDispatch(action) {

    }
}


export default new TicketStore();
