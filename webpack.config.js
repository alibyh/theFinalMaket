const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: '/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'docs')
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Alibyh',
            template: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'assets', to: 'assets' },
                { from: 'menu.html', to: 'menu.html' }, // Add this line
                { from: 'swiper.html', to: 'swiper.html' },
                { from: 'uslogui.html', to: 'uslogui.html' },
                { from: 'price.html', to: 'price.html' },
                { from: 'footer.html', to: 'footer.html' },
                { from: 'feedback.html', to: 'feedback.html' },
                { from: 'feedback2.html', to: 'feedback2.html' },

            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader', // 3. Injects styles into DOM
                    'css-loader',  // 2. Turns CSS into CommonJS
                    'sass-loader'  // 1. Compiles Sass to CSS
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource', // Modern alternative to file-loader
                generator: {
                    filename: 'fonts/[name][ext]',
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
}