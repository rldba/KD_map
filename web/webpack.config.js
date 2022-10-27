const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './js/main.js',
        path: path.resolve(__dirname, 'path')
    },
    devServer: {
        hot: true,
        static: {
            directory: './dist',
            watch: true
        }
    }
}