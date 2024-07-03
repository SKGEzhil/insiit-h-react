
export function jsonToGraphqlString(jsonData) {
    const jsonString = JSON.stringify(jsonData);
    return jsonString.replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// Function to convert GraphQL string back to JSON
export function graphqlStringToJson(graphqlString) {
    const jsonString = graphqlString.replace(/\\"/g, '"').replace(/\\n/g, '\n');
    return JSON.parse(jsonString);
}