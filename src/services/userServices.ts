import {endPoint} from "../config/constants.ts";

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
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.json());
                throw new Error('Network response was not ok.');
            }
        })
        .then((response) => {
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
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
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
            console.log("RESPONSE", response);
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.json());
                throw new Error('Network response was not ok.');
            }
        })
        .then((response) => {
            console.log("RESPONSE", response);
            if (response.errors) {
                return response.data.getUser;
            } else {
                console.log("RESPONSE", response.data);
                return response.data.getUser;
            }
        });
}