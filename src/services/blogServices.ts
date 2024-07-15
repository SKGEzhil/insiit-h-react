import {endPoint} from "../config/constants.ts";

export function addSection(time: string, blocks: string, version: string, page: string) {
    const query = `
        mutation CreateBlogSection($time: String!, $blocks: String!, $version: String!, $page: String!) {
            createBlogSection(time: $time, blocks: $blocks, version: $version, page: $page) {
                id
                blocks
                time
                version
                page
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
            variables: { time, blocks, version, page },
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
                console.log(response.data.createBlogSection);
                return response.data.createBlogSection;
            }
        });
}

export function getSections(page: string) {
    const query = `
        query GetBlogSections($page: String!) {
            getBlogSections(page: $page){
                id
                blocks
                time
                version
                page
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
            variables: { page },
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
                console.log('RESPONSE',response.data.getBlogSections);
                return response.data.getBlogSections;
            }
        });
}

export function deleteSection(id: string) {
    const query = `
        mutation DeleteBlogSection($id: ID!) {
            deleteBlogSection(id: $id)
        }
  `;

    console.log('ID', id)

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
            variables: { id: id },
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
                console.log(response.data.deleteBlogSection);
                return response.data.deleteBlogSection;
            }
        });
}

export function editSection(id: string, blocks: string) {
    const query = `
        mutation EditBlogSection($id: ID!, $blocks: String!) {
            editBlogSection(id: $id, blocks: $blocks) {
                id
                blocks
                time
                version
                page
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
            variables: { id, blocks },
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
                console.log(response.data.editBlogSection);
                return response.data.editBlogSection;
            }
        });
}
