const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
    entry: {
        // Eredeti main, ha akarod standalone futtatni
        'main': './src/main.js',
        // Külön entry, ami custom elementet definál
        'main-web-component': './src/main-web-component.js'
    },
    output: {
        publicPath: 'http://localhost:8084/',
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
            {
                test: /\.s(c|a)ss$/, // SASS és SCSS fájlok kezelése
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'vuetify2App',
            filename: 'remoteEntry.js',
            exposes: {
                // Legyen egy kulcs, ami elérhetővé teszi a custom element-es entry-t
                './Vuetify2App': './src/main-web-component.js',
            },
           // shared: {
           //     vue: {
           //         singleton: false,
           //         strictVersion: true,
           //         requiredVersion: '^2.6.14',
           //     },
          //  },
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },
        compress: true,
        port: 8084,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },
};
