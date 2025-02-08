
import {endPoint} from '../config/constants';

/**
 * @namespace services
 */

/**
 * Fetches all FAQs from the server
 * @memberof services
 * @param {number} page
 * @param {number} limit
 */
export function getFaqs(page: number, limit: number) {
    const query = `
        query GetFAQs($page: Int!, $limit: Int!) {
          getFAQs(page: $page, limit: $limit) {
            _id
            answer
            question
            tags
          }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            // authRequired: true,
            variables: {page, limit}
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
                console.log('FAQs: ',response.data.getFAQs);
                return response.data.getFAQs;
            }
        });
}

/**
 * Searches FAQs from the server
 * @memberof services
 * @param {string} search
 * @param {string[]} tags
 * @param {number} page
 * @param {number} limit
 */
export function searchFaqs(search: string, tags: string[], page: number, limit: number) {
    const query = `
        query SearchFAQs($search: String!, $page: Int!, $limit: Int!, $tags: [String!]) {
          searchFAQs(search: $search, page: $page, limit: $limit, tags: $tags) {
            _id
            question
            answer
            tags
          }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            // authRequired: true,
            variables: {search, tags, page, limit}
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
                console.log('FAQs: ',response.data.searchFAQs);
                return response.data.searchFAQs;
            }
        });

}

/**
 * Adds a new FAQ to the server
 * @memberof services
 * @param {string} question
 * @param {string} answer
 * @param {string[]} tags
 */
export function addFaq(question: string, answer: string, tags: string[]) {
    const query = `
        mutation AddFAQ($question: String!, $answer: String!, $tags: [String]) {
            addFAQ(question: $question, answer: $answer, tags: $tags) {
                _id
                question
                answer
                tags
            }
        }
    `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {question, answer, tags},
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
                console.log(response.data.addFAQ);
                return response.data.addFAQ;
            }
        });

}

/**
 * Updates a FAQ on the server
 * @memberof services
 * @param {string} id
 * @param {string} question
 * @param {string} answer
 */
export function updateFaq(id: string, question: string, answer: string) {
    const query = `
        mutation UpdateFAQ($id: ID!, $question: String!, $answer: String!) {
            updateFAQ(id: $id, question: $question, answer: $answer) {
                _id
                question
                answer
            }
        }
        `;

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {id, question, answer},
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
                console.log(response.data.updateFAQ);
                return response.data.updateFAQ;
            }
        });


}

/**
 * Deletes a FAQ from the server
 * @memberof services
 * @param {string} id
 */
export function deleteFaq(id: string) {
    const query = `
        mutation DeleteFAQ($id: ID!) {
            deleteFAQ(id: $id) {
                _id
            }
        }
    `;

    console.log('ID: ', id);

    return fetch(endPoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') ? JSON.parse(<string>localStorage.getItem('token')) : null}`, // 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            authRequired: true,
            variables: {id},
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
                console.log(response.data.deleteFAQ);
                return response.data.deleteFAQ;
            }
        });
}