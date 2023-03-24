const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 解决--open打开0.0.0.0:8080问题
  // devServer: {
  //   open: true,
  //   host: 'localhost',
  //   port: 8080
  // },

  //代理跨域
  devServer: {
    // 解决--open打开0.0.0.0:8080问题
    open: true,
    host: 'localhost',
    port: 8080,
    //代理跨域
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // 路径重写：这个项目接口都有api,所以不需要配置
        // pathRewrite: { '^/api': '' },
      },
    },
  },
  
  // 关闭eslint校验功能
  lintOnSave: false,


})
