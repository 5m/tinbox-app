import 'whatwg-fetch';
import AuthStore from 'stores/AuthStore';

import { APIv2 } from 'lib/api';
import {
    verifyProtectedResourceResponse,
    jsonResponse
} from 'services/ServiceUtils';


export class MessageService {
    constructor() {
        this.api = (new APIv2())
            .onResponse(verifyProtectedResourceResponse)
            .onResponse(jsonResponse);
    }

}

export default new MessageService();
