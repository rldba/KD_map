module.exports = {
    entry: './src/index.js',
    output: {
        filename: './js/main.js',
    },
    devServer: {
        hot: true,
        static: {
            directory: './dist',
            watch: true
        }
    }
}