module.exports = {
  root: false,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "no-tabs":"off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "space-before-function-paren": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "eqeqeq":0,
    "vue/no-unused-components": "off",
    "no-unused-vars":0
  }
}
