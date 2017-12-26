const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, './app/Resources/assets/sass/style.scss'),
            path.resolve(__dirname, './app/Resources/assets/js/app.js')
        ],
        vendor: [
            'react',
            'react-dom',
            'jquery',
            'select2',
            'bootstrap-sass',
        ]
    },
    output: {
        path: path.resolve(__dirname, './web/assets/build'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["env", "stage-0", "react"]
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'resolve-url-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader"
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/[name].[ext]',
                            publicPath: "/build/"
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/[name].[ext]',
                            publicPath: "/build/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: path.resolve(__dirname, './web')
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js',
            minChunks: Infinity
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, './src/AppBundle/Resources/images/'),
        //         to: 'images'
        //     },
        //     {
        //         from: path.resolve(__dirname, './src/AppBundle/Resources/demo/'),
        //         to: '../images/items'
        //     }
        // ]),
        new ExtractTextPlugin({
            filename: './css/style.css',
            allChunks: true
        })
    ]
};