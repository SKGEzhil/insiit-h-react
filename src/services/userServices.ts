import {endPoint} from "../config/constants.ts";

export function createUser(name: string, email: string, photoUrl: string[]) {
    const query = `
    mutation Mutation($name: String!, $photoUrl: String!, $email: String!) {
      createUser(name: $name, photoUrl: $photoUrl, email: $email) {
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { name, email, photoUrl },
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
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
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log("RESPONSE", response.data);
                return response.data.getUser;
            }
        });
}