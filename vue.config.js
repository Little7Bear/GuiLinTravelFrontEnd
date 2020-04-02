module.exports = {
  lintOnSave: false,

  devServer: {
    port: '8090',
    proxy: {
      '/': { 
        target: 'http://localhost:3000',
      },
    },

  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/mixin.scss";@import "~@/styles/variable.scss";'
      }
    }
  },

}
