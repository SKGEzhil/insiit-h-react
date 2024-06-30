import {endPoint} from "../config/constants.ts";

export function createQuestion(title: string, body: string, tags: string[]) {

    const query = `
    mutation Mutation($title: String!, $body: String!, $tags: [String!]) {
      createQuestion(title: $title, body: $body, tags: $tags) {
        id
        title
        answer {
          id
          answer
          author {
            name
          }
          comments {
            comment
            author {
              name
            }
          }
          date
        }
        body
        tags
        author {
            name
       }
       date
       votes {
          votes
        }
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
export function getQuestions(tags: string[], page: number, limit: number) {
    const query = `
    query Query ($tags: [String!] $page: Int!, $limit: Int!) {
      getQuestions(tags: $tags ,page: $page, limit: $limit) {
        id
        title
        body
        author {
          name
        }
        answer {
          id
          answer
          author {
            name
          }
          comments {
            comment
            author {
              name
            }
          }
          date
        }
        tags
        date
        votes {
          votes
        }
        totalQues
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
        body: JSON.stringify({
            query ,
            variables: { tags, page, limit },
            authRequired: false}
        ),
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
          id
          answer
          author {
            name
          }
          comments {
            comment
            author {
              name
            }
          }
          date
        }
        date
        votes {
          votes
        }
        totalQues
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
            console.log(response);
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
          id
          answer
          author {
            name
          }
          comments {
            comment
            author {
              name
            }
          }
          date
        }
        date
        votes {
          votes
        }
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

export function createComment(questionId: string, answerId: string, comment: string) {
    const query = `
    mutation Mutation($questionId: ID!, $answerId: ID!, $comment: String) {
      createComments(questionId: $questionId, answerId: $answerId, comment: $comment) {
        id
        title
        tags
        body
        author {
          name
        }
        answer {
          id
          answer
          author {
            name
          }
          comments {
            comment
            author {
              name
            }
          }
          date
        }
        date
        votes {
          votes
        }
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
            variables: { questionId, answerId, comment },
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
                console.log(response.data.createComments);
                return response.data.createComments;
            }
        });
}

export function upvoteQuestion(id: string) {
    const query = `
    mutation Mutation($id: ID!) {
      upvoteQuestion(id: $id) {
        id
        title
        tags
        body
        author {
          name
        }
        answer {
          id
          answer
          author {
            name
          }
          comments {
            comment
            author {
              name
            }
          }
          date
        }
        date
        votes {
          votes
        }
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
            variables: { id },
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
                console.log(response.data.upvoteQuestion);
                return response.data.upvoteQuestion;
            }
        });
}


export function searchQuestion(search: string, tags: string[], page: number, limit: number) {
    const query = `
    query Query($search: String!, $tags: [String!], $page: Int!, $limit: Int!) {
      searchFunction(search: $search, tags: $tags, page: $page, limit: $limit) {
        id
        title
        tags
        body
        author {
          name
        }
        answer {
          id
          answer
          author {
            name
          }
          comments {
            comment
            author {
              name
            }
          }
          date
        }
        date
        votes {
          votes
        }
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
            variables: { search, tags, page, limit },
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
                console.log(response.data.searchFunction);
                return response.data.searchFunction;
            }
        });
}
