module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  plugins: ['sonarjs'],
  extends: [
    'airbnb-base',
    'plugin:sonarjs/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-console': 'off',
    'no-return-await': 'off',
    'import/no-unresolved': 'off',
  },
};
