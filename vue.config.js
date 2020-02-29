module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8090,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/mixin.scss";`
      }
    }
  }
}
