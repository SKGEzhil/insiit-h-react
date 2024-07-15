import {endPoint} from "../config/constants.ts";


export function questionActions(action, data) {

    const query = `
   
    mutation Mutation($action: String!, $data: QuestionInput!) {
      questionActions(action: $action, data: $data) {
        ... on Question {
          id
          title
        }
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(localStorage.getItem('token') as string) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: { action, data }
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
                console.log(response.data.questionActions);
                return response.data.questionActions;
            }
        });
}

export function answerActions(action, data) {

    const query = `
   
    mutation Mutation($action: String!, $data: AnswerInput!) {
      answerActions(action: $action, data: $data) {
        ... on Question {
          id
          title
        }
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(localStorage.getItem('token') as string) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: { action, data }
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
                console.log(response.data.answerActions);
                return response.data.answerActions;
            }
        });
}

export function commentActions(action, data) {

    const query = `
   
    mutation Mutation($action: String!, $data: CommentInput!) {
      commentActions(action: $action, data: $data) {
        ... on Question {
          id
          title
        }
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') !== 'null' ? JSON.parse(localStorage.getItem('token') as string) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: { action, data }
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
                console.log(response.data.commentActions);
                return response.data.commentActions;
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
            id
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
          id
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
            id
            name
          }
          comments {
            id
            comment
            author {
              name
              id
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
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') as string) : null}`, // 'Bearer ' + token,
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: false,
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
