/**
 * @file
 */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCssModuleEscaper = require('../src/index');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[hash][name].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[hash:base64]',
                                getLocalIdent: (context, localIdentName, localName) => {
                                    return null;
                                }
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require.resolve('../src/postcss-plugin')
                                ],
                            },
                        },
                    },
                    'less-loader',
                ],
            },
        ]
    },
    plugins: [
        new WebpackCssModuleEscaper.plugin(),
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            linkType: "text/css",
        })
    ]
}
