module.exports = {
  env: {
    node: true, // Enables Node.js environment
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@tanstack/query'],
  root: true,
  rules: {
    // 들여쓰기 규칙 (2개의 공백 사용)
    indent: ['error', 2],

    // 세미콜론 규칙 (세미콜론 항상 사용)
    semi: ['error', 'always'],

    // 따옴표 규칙 (단일 따옴표 사용)
    quotes: ['error', 'single'],
    // 코드 최대 길이 규칙 (80자 라인 제한)
    'max-len': [
      'error',
      {
        code: 150,
        ignorePattern: '^\\s*//\\s*$',
        ignoreComments: true, // 주석은 무시하지 않음
      },
    ],

    // 변수 선언 규칙 (항상 const 사용)
    'prefer-const': 'warn',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'off',
  },
};
