var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib-numbers-webpack.js',
    library: 'libNumbersWebpack',
    libraryTarget: 'umd'
  },
  externals: { // 用这个选项避免将lodash打包到应用程序，而使用者会去加载它  
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}