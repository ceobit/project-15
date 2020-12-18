const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    entry: ['@babel/polyfill', './src/script/script.js'],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development",
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: isProd //Минимифицируем index.html
        }
        }),
        //Чистим папку dist после изменений
        new CleanWebpackPlugin(),
        //Чтобы css формировался в отдельном файле
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        //Оптимизация css
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    'css-loader', 'postcss-loader'
                ]
            },
            {// Сжимаем картинки
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            esModule: false,
                        }
                    },
                ]
            },
            {// Учим Webpack понимать шрифты
                test: /\.(ttf|woff2|woff)$/,
                use: ['file-loader']
            },
            //babel для поддержки старых браузеров
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    // Автообновление в браузере
    devServer: {
        port: 5490
    }
};