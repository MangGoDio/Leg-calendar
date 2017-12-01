const webpack = require('webpack')

module.exports = {
    entry: [
        './src/js/entry.js',
    ],
    output: {
        path: __dirname + "/lib",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'stage-0', 'react'] }
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                }
            ]
        }
        ]
    },
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
}
