module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      // useBuiltIns: 'usage',
      corejs: 3,
      modules: false
    }],
    ['@babel/preset-react'],
    ['babel-preset-mobx']
  ],
  plugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }],
    '@babel/plugin-transform-runtime'
  ]
};
