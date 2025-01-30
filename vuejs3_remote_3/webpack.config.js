const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    entry: {
        // Eredeti main, ha akarod standalone futtatni
        'main': './src/main.js',
        // Külön entry, ami custom elementet definál
        'main-web-component': './src/main-web-component.js'
    },
    output: {
        publicPath: 'http://localhost:8083/',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'vueJS3App',
            filename: 'remoteEntry.js',
            exposes: {
                // Legyen egy kulcs, ami elérhetővé teszi a custom element-es entry-t
                './Vue3WebComponent': './src/main-web-component.js',
            },
            shared: {
                // Célszerű a Vue 3-at *nem* megosztani a hosttal, hiszen ott Vue2 fut
                // Ha mindenképp meg akarod osztani, vegyél ki belőle strictVersion-t
                vue: {
                    singleton: false,
                    requiredVersion: '^3.5',
                },
                vuetify: { singleton: false, requiredVersion: '^3.0.0' },
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new VueLoaderPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        compress: true,
        port: 8083,
        hot: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },
};
