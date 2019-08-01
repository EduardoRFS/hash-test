module.exports = {
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        'import/prefer-default-export': 0,
    },
    overrides: [
        {
            files: [
                '**/__tests__/**/*.js',
                '*.spec.js',
                '**/__tests__/**/*.ts',
                '*.spec.ts',
            ],
            plugins: ['jest'],
            env: {
                jest: true,
            },
            rules: {
                'jest/no-alias-methods': 'warn',
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/no-jest-import': 'error',
                // 'jest/no-mocks-import': 'error',
                'jest/no-jasmine-globals': 'warn',
                'jest/no-test-prefixes': 'error',
                'jest/valid-describe': 'error',
                'jest/valid-expect': 'error',
                'jest/valid-expect-in-promise': 'error',
            },
        },
    ],
};
