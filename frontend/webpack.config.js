module.exports = {
    resolve: {
      fallback: {
        process: require.resolve("process/browser"),
      },
    },
  };
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ]
  
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "process": require.resolve("process/browser")
    }
  }
  