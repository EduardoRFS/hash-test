module.exports = {
  parserOptions: { project: './tsconfig.json' },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/explicit-function-return-type': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.ts', '*.spec.ts'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/valid-describe': 0,
        'no-shadow': 0,
      },
    },
  ],
};
