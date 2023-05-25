const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave: false,
  //配置代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        //pathRewrite: { '^/api': '' }, 
      },
    },
  },
  publicPath: process.env.NODE_ENV="production"?"./":"/",
  
})
