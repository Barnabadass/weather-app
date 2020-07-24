module.exports = {
  entry: "./src/main.tsx",
  module: {
      rules: [
          {
            test: /\.tsx?$/,
            use: 'awesome-typescript-loader',
            exclude: /node_modules/,
          }
      ]
  },
  resolve: {
      extensions: ["*", ".ts", ".tsx", ".js"]
  },
  output: {
      path: __dirname + "/dist/",
      filename: "bundle.js"
  }
};