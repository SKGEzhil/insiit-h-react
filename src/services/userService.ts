import { endPoint } from "../config/constants.ts";


/**
 * Fetches all questions asked by a specific user
 * @memberof services
 */

export function getUserQuestions(emailId: string){
    console.log("FETCHING QNS");
    const query = `
        query GetUserQuestions {
          getUserQuestions {
            questions {
                id
                title
                body
                author {
                  name
                }
              
                tags
                date
                votes {
                  votes
                }
            }
          }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        credentials: 'include',
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
                console.log(response.data.getUserQuestions);
                return response.data.getUserQuestions;
            }
        });

}

