const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require('webpack');

const devServer = (develop) => {
  return develop ? {
    devServer:{
      port: 3000,
      open: true,
    }
  } : {};
}

const eslint = (develop) => {
  return develop ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js', 'tsx'] }) ];
}

const definePlugin = (isDev) => {
  const mode = isDev ? 'development' : 'production';
  return [new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(mode)
  })];
}

module.exports = ({develop}) => ({
  entry: {
    main: "./src/client/index.tsx",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx??$/,
        loader: "ts-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtract.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtract.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    ...definePlugin(develop),
    ...eslint(develop),
    new MiniCssExtract({ filename: "[name].[contenthash].css" }),
    new HtmlWebpackPlugin({ template: "./src/client/index.html" }),
    new CopyPlugin({
      patterns: [{ from: "./public" }],
    }),
    new CleanWebpackPlugin(),
  ],
  ...devServer(develop)
})