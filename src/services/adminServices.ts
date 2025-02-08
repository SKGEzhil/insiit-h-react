import {endPoint} from "../config/constants.ts";

/**
 * @namespace services
 */

/**
 * Fetches all the pending requests from server
 * @memberof services
 * @param {string} action
 */
export function getApprovalQueue(action: string) {
    const query = `
        query GetApprovalQueue($action: String!) {
            getApprovalQueue(action: $action) {
                id
                action
                user {
                    id
                    name
                    email
                }
                date
                status
                data
            }
        }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {action},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.getApprovalQueue);
                return response.data.getApprovalQueue;
            }
        });
}

/**
 * Takes action on approval request
 * @memberof services
 * @param {string} id Queue ID
 * @param {string} status {'approved', 'rejected'}
 */
export function takeAction(id: string, status: string) {
    const query = `
        mutation TakeAction($id: ID!, $status: String!) {
            takeAction(id: $id, status: $status) {
                id
                action
                status
            }
        }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {id, status},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.takeAction);
                return response.data.takeAction;
            }
        });
}

/** ------  FLAGGED CONTENT  ------- **/

/**
 * Resolves a flag
 * @memberof services
 * @param {string} id
 */
export function resolveFlag(id: string) {
    const query = `
        mutation ResolveFlag($id: ID!) {
            resolveFlag(id: $id) {
                _id
                status
            }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {id},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.flagContent);
                return response.data.flagContent;
            }
        });
}

/**
 * Flags a content
 * @memberof services
 * @param {string} contentType
 */
export function getFlaggedContent(contentType: string) {
    const query = `
        query GetFlaggedContent($contentType: String!) {
          getFlaggedContent(contentType: $contentType) {
            questionId
            contentType
            contentId
            _id
            status
            content
          }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {contentType},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                // console.log('CONTENT', response.data.getFlaggedContent);
                return response.data.getFlaggedContent;
            }
        });
}

/** ------  USER ACTIONS  ------- **/

/**
 * Fetches user data
 * @memberof services
 * @param {string} emailId
 */
export function getUserData(emailId: string){
    const query = `
        query GetUserData($emailId: String!) {
          getUserData(emailId: $emailId) {
            email
            id
            name
            permissions
            photoUrl
            role
          }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {emailId},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.getUserData);
                return response.data.getUserData;
            }
        });

}

/**
 * Edits user data
 * @memberof services
 * @param {string} userId
 * @param {string} name
 * @param {string[]} permissions
 * @param {string} role
 */
export function editUser(userId: string, name: string, permissions: string[], role: string){
    const query = `
        mutation EditUser($userId: ID!, $role: String!, $permissions: [String]!, $name: String!) {
          editUser(userId: $userId, role: $role, permissions: $permissions, name: $name) {
            id
            email
          }
        }
      `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {userId, role, name, permissions},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.editUser);
                return response.data.editUser;
            }
        });

}

/**
 * Deletes user
 * @memberof services
 * @param {string} userId
 */
export function deleteUser(userId: string){
    const query = `
        mutation DeleteUser($userId: ID!) {
          deleteUser(userId: $userId) {
            id
          }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {userId},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.deleteUser);
                return response.data.deleteUser;
            }
        });

}

/**
 * Fetches all users of a specific role
 * @memberof services
 * @param {string} role
 */
export function getAllUsers(role: string){
    const query = `
        query GetAllUsers($role: String!) {
          getAllUsers(role: $role) {
            id
            name
            email
            role
            photoUrl
            permissions
          }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {role},
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if (response.status && response.status === 'error') {
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.getAllUsers);
                return response.data.getAllUsers;
            }
        });

}
