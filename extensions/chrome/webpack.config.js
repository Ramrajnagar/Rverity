const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'background/service-worker': './src/background/service-worker.ts',
        'content/content-script': './src/content/content-script.ts',
        'popup/popup': './src/popup/popup.ts',
        'options/options': './src/options/options.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'manifest.json', to: '../manifest.json' },
                { from: 'popup.html', to: '../popup.html' },
                { from: 'options.html', to: '../options.html' },
                { from: 'src/content/styles.css', to: 'content/styles.css' }
            ]
        })
    ]
};
