const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/***
const { EnvironmentPlugin } = require('webpack');
const { getIfUtils, propIf, removeEmpty } = require('webpack-config-utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
*/

const htmlLoader =  { 
    test: /\.html$/i,
    use: "html-loader",
}

const babelLoader = {
    test: /\.(js|jsx)$/,
    use: 'babel-loader',
    exclude: /node_modules/
}

const urlLoader = {
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            mimetype: 'image/png',
            limit: 81920
        }
    }]
}

const fileLoader = {
    test: /\.(png|jpg|gif)$/,
    use: [{
        loader: 'file-loader',
        options: {
            publicPath: 'assets',
            name: '[path][name].[ext]'
        }
    }]
}

const cssLoader = {
    test: /\.(s*)css$/,
    exclude: /node_modules/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader
        },
        {
            loader: 'css-loader',
            options: {
                modules: false,
            }
        }
    ]
}

const fontLoader = { test: /\.(woff|woff2|eot|ttf)$/, use: 'url-loader?limit=100000' }

const SRC = path.resolve(__dirname, "src");
const PUBLIC = path.resolve(__dirname, "public");
const DIST = path.resolve(__dirname, "dist");


module.exports = {
    mode: 'production',
    entry: {
        app: path.join(SRC, "index.jsx"),
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: "./",
        crossOriginLoading:"anonymous",
        path: DIST,
        chunkFilename: "[name].chuk.js",
    },
    stats: 'errors-only',
    plugins: [
        new ProgressBarPlugin(),
        new CaseSensitivePathsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({ template: path.join(SRC,'/index.html') }),
        new CopyPlugin({
            patterns: [
              { from: path.join(PUBLIC, "/"), to: DIST },
            ],
          }),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            ignoreOrder: true
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.html', '.css'],
        alias: {
            "@src": SRC,
        },
    },
    module: {
        rules: [htmlLoader, fileLoader, cssLoader, urlLoader, babelLoader, fontLoader],
    },
    optimization: {
        moduleIds: "named"
    }
}

