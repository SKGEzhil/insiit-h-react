import {endPoint} from "../config/constants.ts";

/**
 * @namespace QuestionServices
 */

/**
 * @typedef QuestionInput
 * @property {string} id - The id of the question.
 * @property {string} title - The title of the question.
 * @property {string} body - The body of the question.
 * @property {string[]} tags - The tags of the question.
 */

/**
 * @typedef AnswerInput
 * @property {string} questionId - The id of the question on which the particular answer exists.
 * @property {string} answerId - The id of the answer.
 * @property {string} answer - The answer content.
 */

/**
 * @typedef CommentInput
 * @property {string} questionId - The id of the question on which the particular comment exists.
 * @property {string} answerId - The id of the answer on which the particular comment exists.
 * @property {string} commentId - The id of the comment.
 * @property {string} comment - The comment content.
 */

/**
 * Handles all the actions related to questions
 * @memberof QuestionServices
 * @param {string} action {"CREATE", "EDIT", "DELETE"}
 * @param {QuestionInput} data
 */
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
                console.log('QA RESPONSE',response.data.questionActions);
                return response.data.questionActions;
            }
        });
}

/**
 * Handles all the actions related to answers
 * @memberof QuestionServices
 * @param {string} action {"CREATE", "EDIT", "DELETE"}
 * @param {AnswerInput} data
 */
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

/**
 * Handles all the actions related to comments
 * @memberof QuestionServices
 * @param {string} action {"CREATE", "EDIT", "DELETE"}
 * @param {CommentInput} data
 */
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

/**
 * Fetches all questions from server based page and page limit provided
 * @memberof QuestionServices
 * @param {number} page
 * @param {number} limit
 */
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
        answers {
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
          votes {
            votes
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

/**
 * Fetches a single question from the server based on the question id provided
 * @memberof QuestionServices
 * @param {string} getQuestionId
 */
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
        answers {
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
          votes {
            votes
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

/**
 * Upvotes a question based on the question id provided
 * @memberof QuestionServices
 * @param {string} id
 */
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

/**
 * Searches for questions based on the search query and tags provided
 * @memberof QuestionServices
 * @param search
 * @param tags
 * @param page
 * @param limit
 */
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
        answers {
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
