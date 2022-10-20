const path = require('path') // nodejs核心模块，专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  //入口
  entry: './src/main.js', //相对路径
  //输出
  output: {
    path: path.resolve(__dirname, 'dist'),//绝对路径
    filename: 'static/js/index.js',
    clean:true, //自动清空上次打包结果;
  },
  //加载器
  module: {
    rules: [
      //loader的配置
      {
        test: /\.css$/, // 只检测.css结尾文件
        use: [ //执行顺序，从右到左或从上到下
          'style-loader', //通过js中css通过创建style标签的形式添加到html文件中
          'css-loader', //将css资源编译成commonjs模块到js中
        ],
      },
      { //less
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader', //将css资源编译成commonjs模块到js中
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          "stylus-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type:'asset', //会转base64
        parser: {
          dataUrlCondition:{
            //小于10kb的图片base64
          //优点：减少请求数量，缺点：体积会更大
          maxSize:10*1024, //图片最大的内存值10kb
          }
        },
        generator: { // 输出图片名称
          //[hash:10] hash值只取前十位  ext 代表文件后缀名不变 query代表带的参数
          filename: 'static/images/[hash:10][ext][query]' 
        }
      },
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/, //处理需要原封输出的静态资源
        type:'asset/resource', // 默认原格式输出
        generator: { 
          // 输出名称
          filename: 'static/media/[hash:10][ext][query]' 
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },  
  //插件
  plugins: [new ESLintPlugin({
     context:path.resolve(__dirname,'src'), //检测那些文件

  })],

  //模式
  mode: 'development'
}