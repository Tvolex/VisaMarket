const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', __dirname + "/public/index.js"],
    output: {
        path: __dirname + "/public",
        filename: 'build.js',
        library: 'index',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

if (module.hot) {
    const api = require('vue-hot-reload-api')
    const Vue = require('vue')

    // make the API aware of the Vue that you are using.
    // also checks compatibility.
    api.install(Vue)

    // compatibility can be checked via api.compatible after installation
    if (!api.compatible) {
        throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
    }


    // indicate this module can be hot-reloaded
    module.hot.accept()

    if (!module.hot.data) {
        // for each component option object to be hot-reloaded,
        // you need to create a record for it with a unique id.
        // do this once on startup.
        api.createRecord('very-unique-id', myComponentOptions)
    } else {
        // if a component has only its template or render function changed,
        // you can force a re-render for all its active instances without
        // destroying/re-creating them. This keeps all current app state intact.
        api.rerender('very-unique-id', myComponentOptions)

        // --- OR ---

        // if a component has non-template/render options changed,
        // it needs to be fully reloaded. This will destroy and re-create all its
        // active instances (and their children).
        api.reload('very-unique-id', myComponentOptions)
    }

    module.exports.plugins = [
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                loaders: [
                    {
                        test: /\.vue\.js/,
                        loader: 'vue-js',
                    },
                ]
            }
        })
    ]
}