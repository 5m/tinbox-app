var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        // WebpackDevServer host and port
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/start'
    ],
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: path.join('js', 'trak-dev.js'),
        publicPath: 'http://localhost:3000/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.json'],
        root: path.resolve('./src')
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [
                    'react-hot',
                    'babel?optional[]=runtime&stage=0',
                ],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: path.resolve(__dirname)
            }
        ]
    }
};
