const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    output: { path: path.resolve(__dirname, "build"), filename: "main.js" }
};

module.exports = {
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/easlides.js',
        globalObject: 'this',
        library: {
            name: 'ealides',
            type: 'umd',
        },
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `/asset/[name][ext]`;
        },
    },
    devtool: "source-map",
};

