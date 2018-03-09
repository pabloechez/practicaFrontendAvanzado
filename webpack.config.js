const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports={
    entry: path.join(__dirname,'src','entry.js'),

    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use:  [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader?url=false", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "less-loader", options: {
                        sourceMap: true
                    }
                }],
            },
            {
                test:/\.js$/,
                use: "babel-loader",
                exclude: path.join(__dirname,'node_modules')
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    'file-loader?name=[name].[ext]&useRelativePath=true',
                    'image-webpack-loader'
                ]
            },
            {
                test: /assets.[^img]/,
                use: 'file-loader?name=[name].[ext]&useRelativePath=true'
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader?name=[name].[ext]&useRelativePath=true',
                exclude: [/img/]
            },
            {
                test: /\.(html|ejs)$/,
                use:['html-loader','ejs-html-loader']
            }

        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'post-detail.html',
            template: path.join(__dirname, 'src', 'post-detail.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname,'src/assets/img/','logo.svg'),
            prefix: 'src/assets/img/icons-[hash]/',
        })
    ],

    devServer: {
        open: true, //abre el navegador
        port: 3000, //puerto del servidor
        overlay: true, //muestra los errores en pantalla
        hot: true,
        contentBase: path.join(__dirname,'src'),
        watchContentBase: true
    }
};