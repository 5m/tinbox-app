import _ from 'lodash';
import AuthActions from 'actions/AuthActions';


export function verifyProtectedResourceResponse(response) {
    let invalidResponseStatuses = [
        400,
        401,
        403
    ];

    if (_.contains(invalidResponseStatuses, response.status)) {
        throw new Error(
            `Invalid response status: ${this.constructor.name}`);
    }
    return response;
}

export function jsonResponse(response) {
    return response.json()
}
