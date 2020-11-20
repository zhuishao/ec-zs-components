var path=require('path');

module.exports = {
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'ec-zs-components': path.resolve(__dirname, './'),
            },
            extensions: ['.js', '.vue', '.json'],
        }
    },
}
