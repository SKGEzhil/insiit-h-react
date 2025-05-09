import {endPoint, endPointBase} from "../config/constants.ts";

/**
 * Sends post request to the server to create a new user
 * @memberof services
 */
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
        credentials: 'include',
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

/**
 * Sends post request to the server to get user details, indeed checking if user exists
 * @param {string} email
 *
 * @memberof services
 */
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
        credentials: 'include',
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

/**
 * Sends token to the server via header and verify the user role\
 * **Note:** This function is used to check if the user is admin or not
 * @method login
 * @memberof services
 *
 */
export function login(){
    return fetch(`${endPointBase}/login`, {
        method: 'POST',
        credentials: 'include',
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

/**
 * Checks if the Tinkerers' Lab support section should be shown
 * Sends a GET request to the backend and returns true/false
 * Returns false if backend is unreachable or any error occurs
 */
export async function getShowTinkerersLabSupport() {
    try {
        const response = await fetch(`${endPointBase}/show-tinkerers-lab-support`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) return false;
        const data = await response.json();
        // Expecting { show: true } or { show: false }
        return !!data.show;
    } catch (e) {
        return false;
    }
}