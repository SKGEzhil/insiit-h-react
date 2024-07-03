import {endPoint} from "../config/constants.ts";

export function addSection(time: string, blocks: string, version: string) {
    const query = `
        mutation CreateAcademicsSection($time: String!, $blocks: String!, $version: String!) {
            createAcademicsSection(time: $time, blocks: $blocks, version: $version) {
                id
                blocks
                time
                version
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
            variables: { time, blocks, version },
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
                console.log(response.data.createAcademicsSection);
                return response.data.createAcademicsSection;
            }
        });
}

export function getSections() {
    const query = `
        query Query {
            getAcademicsSections {
                id
                blocks
                time
                version
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
                console.log(response.data.getAcademicsSections);
                return response.data.getAcademicsSections;
            }
        });
}
