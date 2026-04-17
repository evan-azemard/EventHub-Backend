export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            useESM: true,
            tsconfig: 'tsconfig.jest.json',
            diagnostics: false,
        }],
    },
    testMatch: ['**/src/**/*.test.ts'],
    setupFiles: ['reflect-metadata'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
