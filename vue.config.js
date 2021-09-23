module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.128.4.80/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  }
}