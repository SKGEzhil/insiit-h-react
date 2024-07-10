import {endPoint, endPointBase} from "../config/constants.ts";

export function createUser() {
    const query = `
    mutation {
      createUser {
        id
        name
        email
        role
        photoUrl
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(<string>(localStorage.getItem('token'))) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
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
                console.log(response.data.createUser);
                return response.data.createUser;
            }
        });
}

export function isUserExist(email: string) {
    const query = `
    query Query($email: String!) {
      getUser(email: $email) {
        name
        photoUrl
        role
        email
        id
        permissions
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(<string>(localStorage.getItem('token'))) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: { email },
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
                return response.data.getUser;
            } else {
                console.log("RESPONSE", response.data);
                return response.data.getUser;
            }
        });
}

export function login(){
    return fetch(`${endPointBase}/login`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(<string>(localStorage.getItem('token'))) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            authRequired: true,
        }),
    }).then((response) => {
        return response.json()
    }).then((response) => {
        if(response.status === 'error'){
            throw new Error(response.data.message);
        }
        else {
            return response.data.message;
        }
    });
}