import {endPoint} from "../config/constants.ts";


export function createQuestion(title: string, body: string, tags: string[], author: string | undefined) {
    const query = `
    mutation Mutation($title: String!, $body: String!, $tags: [String!], $author: String!) {
      createQuestion(title: $title, body: $body, tags: $tags, author: $author) {
        id
        title
        answer
        body
        tags
        author {
            name
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
            variables: { title, body, tags, author },
        }),
    })
        .then((response) => {
            console.log("Response", response);
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
      }
    }
  `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query }),
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
                return response.data.getQuestions;
            }
        });
}

export function getQuestion(getQuestionId: string) {
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
            variables: { getQuestionId },
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("response:", response);
                throw new Error('Network response was not ok.');
            }
        })
        .then((response) => {
            if (response.errors) {
                console.log("response:", response);
                throw new Error(response.errors[0].message);
            } else {
                return response.data.getQuestion;
            }
        });
}

export function answerQuestion(id: string, answer: string, author?: string) {
    const query = `
    mutation Mutation($id: ID!, $answer: String, $author: String) {
      answerQuestion(id: $id, answer: $answer, author: $author) {
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
            variables: { id, answer, author },
        }),
    })
        .then((response) => {
            console.log("Response", response);
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
                console.log(response.data.answerQuestion);
                return response.data.answerQuestion;
            }
        });
}


