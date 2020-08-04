const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function processCss (loader) {
  const useLoader = loader + '-loader';
  const use = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }, {
    // 需要添加postcss配置文件
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: useLoader,
    options: {
      sourceMap: true
    }
  }
  ];
  return use;
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', './src/main.jsx']
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [resolve('src')]
    },
    {
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      // 表示eslint-loader先执行，与babel-loader存在前后顺序，eslint-loader
      // 要检查装换之前的代码，所以eslint-loader先执行
      enforce: 'pre',
      include: [resolve('src')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.css$/,
      sideEffects: true,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        {
          loader: 'css-loader',
          options: {}
        }
      ]
    },
    {
      test: /\.s[ac]ss$/,
      sideEffects: true,
      use: processCss('sass')
    },
    {
      test: /\.less$/,
      sideEffects: true,
      use: processCss('less')
    },
    {
      test: /\.styl(us)?$/,
      sideEffects: true,
      use: processCss('stylus')
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:8].[ext]',
        // 因为file-loader将此项配置默认为true，方便tree shaking
        // 但是这样会导致使用src='./images/....png'的引用方式失效，故设置为false使其生效
        // 建议采用ES modules的方式引入,例如：
        // const imgsrc = require('./images/login-img.png');
        esModule: false
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]',
        esModule: false
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]',
        esModule: false
      }
    }
    ]
  }
};
