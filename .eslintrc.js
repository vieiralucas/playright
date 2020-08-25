module.exports = {
  root: true,
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 0,
    'no-await-in-loop': 0,
  },
};
