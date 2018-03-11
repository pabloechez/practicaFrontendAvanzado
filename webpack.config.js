const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const isProduction = process.env.ENTORNO === "produccion";
let lessLoaders = [];
if (isProduction) {
    lessLoaders = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?url=false&sourceMap=true', 'less-loader?sourceMap=true']
    });
} else {
    lessLoaders =  [{
        loader: "style-loader"
    }, {
        loader: "css-loader?url=false", options: {
            sourceMap: true
        }
    }, {
        loader: "less-loader", options: {
            sourceMap: true
        }
    }];
}


module.exports={
    entry: path.join(__dirname,'src','entry.js'),

    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: lessLoaders,
            },
            {
                test:/\.js$/,
                use: "babel-loader",
                exclude: path.join(__dirname,'node_modules')
            },
            {
                test: /\.(jpe?g|png|gif|svg|mov|mp4)$/,
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
        }),
        new ExtractTextPlugin('src/css/style.css'),
        new CopyWebpackPlugin([
            {from:'src/assets/img',to:'src/assets/img'},
            { from: 'src/assets/fonts', to: 'src/assets/fonts' }
        ]),
        new ImageminPlugin({disable: process.env.ENTORNO !== 'produccion',})
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