const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决--open打开0.0.0.0:8080问题
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080
  },
  // 关闭eslint校验功能
  lintOnSave:false,


})
