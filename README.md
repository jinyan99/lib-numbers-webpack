## 用webpack打包库

[参考链接](https://v4.webpack.docschina.org/guides/author-libraries/)

### 创建library
- 除了打包应用程序，webpack 还可以用于打包 JavaScript library。以下指南适用于希望简化打包策略的 library 作者

- 假设你正在编写一个名为 webpack-numbers 的小的 library，可以将数字 1 到 5 转换为文本表示，反之亦然，例如将 2 转换为 'two'。
- 创建这个lib得满足前端常用的调用规范（ES2015，CommonJS，AMD，script标签）

### 基本配置
现在，让我们以某种方式打包这个 library，能够实现以下几个目标：

- **使用 externals 选项，避免将 lodash 打包到应用程序，而使用者会去加载它。**
- 将 library 的名称设置为 webpack-numbers。
- 将 library 暴露为一个名为 webpackNumbers 的变量。
- 能够访问其他 Node.js 中的 library。
此外，consumer(使用者) 应该能够通过以下方式访问 library：

- ES2015 模块。例如 import webpackNumbers from 'webpack-numbers'。
- CommonJS 模块。例如 require('webpack-numbers').
- 全局变量，在通过 script 标签引入时

### 外部化限制本项目lodash

- **使用 externals 选项，避免将 lodash 打包到应用程序，而使用者会去加载它。**

### 外部化限制
对于想要实现从一个依赖中调用多个文件的那些 library：
```js
import A from 'library/one';
import B from 'library/two';
// ===========
module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // 匹配以 "library/" 开始的所有依赖
    /^library\/.+$/
  ]
};
```
无法通过在 externals 中指定整个 library 的方式，将它们从 bundle 中排除。而是需要逐个或者使用一个正则表达式，来排除它们。


### 暴漏library
- 对于用法广泛的 library，我们希望它能够兼容不同的环境，例如 CommonJS，AMD，Node.js 或者作为一个全局变量。
- 为了让你的 library 能够在各种使用环境中可用，需要在 output 中添加 library 属性：
- 这会将你的 library bundle 暴露为名为 webpackNumbers 的全局变量，consumer 通过此名称来 import。为了让 library 和其他环境兼容，则需要在配置中添加 libraryTarget 属性。这个选项可以控制以不同形式暴露 library。

#### 具体

// 有以下几种方式暴露 library：

- 变量：作为一个全局变量，通过 script 标签来访问（libraryTarget:'var'）。
- this：通过 this 对象访问（libraryTarget:'this'）。
- window：在浏览器中通过 window 对象访问（libraryTarget:'window'）。
- UMD：在 AMD 或 CommonJS require 之后可访问（libraryTarget:'umd'）。


- 如果设置了 library 但没有设置 libraryTarget，则 libraryTarget 默认指定为 var，详细说明请查看 output 文档