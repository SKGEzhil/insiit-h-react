
export function jsonToGraphqlString(jsonData: never) {
    return JSON.stringify(jsonData);
    // return jsonString.replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// Function to convert GraphQL string back to JSON
export function graphqlStringToJson(graphqlString: string) {
    // const jsonString = graphqlString.replace(/\\"/g, '"').replace(/\\n/g, '\n');
    return JSON.parse(graphqlString);
}

