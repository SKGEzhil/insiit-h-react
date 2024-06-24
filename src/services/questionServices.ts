import {endPoint} from "../config/constants.ts";
import {useAuth} from "../context/authContext.tsx";


export function createQuestion(title: string, body: string, tags: string[]) {

    const query = `
    mutation Mutation($title: String!, $body: String!, $tags: [String!]) {
      createQuestion(title: $title, body: $body, tags: $tags) {
        id
        title
        answer {
          answer
          author {
            name
          }
            date
        }
        body
        tags
        author {
            name
       }
       date
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
            variables: { title, body, tags },
        }),
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            if(response.status && response.status === 'error'){
                console.log('ERROR OCCURED');
                throw new Error(response.message);
            }
            if (response.errors) {
                throw new Error(response.errors[0].message);
            } else {
                console.log(response.data.createQuestion);
                return response.data.createQuestion;
            }
        });
}
export function getQuestions() {
    const query = `
    query Query {
      getQuestions {
        id
        title
        body
        author {
          name
        }
        answer {
          answer
          author {
            name
          }
          date
        }
        tags
        date
      }
    }
  `;



    return fetch(endPoint, {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('userData') !== 'null' ? JSON.parse(localStorage.getItem('userData')).token : 'NONE'}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query , authRequired: false}),
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
                console.log(response.data.getQuestions);
                return response.data.getQuestions;
            }
        });
}

export function getQuestion(getQuestionId: string) {

    // const {token} = useAuth();

    const query = `
    query Query($getQuestionId: ID!) {
      getQuestion(id: $getQuestionId) {
        author {
          name
        }
        body
        id
        tags
        title
        answer {
          answer
          author {
            name
          }
          date
        }
        date
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
            authRequired: false,
            variables: { getQuestionId },
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
                console.log(response.data.getQuestion);
                return response.data.getQuestion;
            }
        });
}

export function answerQuestion(id: string, answer: string) {
    const query = `
    mutation Mutation($id: ID!, $answer: String) {
      answerQuestion(id: $id, answer: $answer) {
        id
        title
        tags
        body
        author {
          name
        }
        answer {
          answer
          author {
            name
          }
          date
        }
        date
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: { id, answer },
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
                console.log(response.data.answerQuestion);
                return response.data.answerQuestion;
            }
        });
}


