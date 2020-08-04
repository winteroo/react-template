module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    // 启用hooks规范检查
    'plugin:react-hooks/recommended',
    'standard',
    'standard-react'
  ],
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    // 必须添加分号
    semi: [2, 'always'],
    'react/prop-types': 'off'
  }
};
