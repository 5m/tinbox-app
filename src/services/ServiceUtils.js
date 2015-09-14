import _ from 'lodash';
import AuthActions from 'actions/AuthActions';


export function verifyProtectedResourceResponse(response) {
    let invalidResponseStatuses = [
        400,
        403
    ];

    if (response.status == 401) {
        AuthActions.logoutUser();
    }

    if (_.contains(invalidResponseStatuses, response.status)) {
        throw new Error(
            `Invalid response status: ${response.status}`);
    }
    return response;
}

export function jsonResponse(response) {
    return response.json()
}
