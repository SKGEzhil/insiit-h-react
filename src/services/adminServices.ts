import {endPoint} from "../config/constants.ts";

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
            variables: { action },
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if(response.status && response.status === 'error'){
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
            variables: { id, status },
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if(response.status && response.status === 'error'){
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
