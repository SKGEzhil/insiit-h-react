export default {
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    // other Jest configurations...
};