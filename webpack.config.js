const path = require('path');

module.exports = {
    entry: './public/js/dist/pug-templates.js',
    output: {
        filename: 'client-bundle.js',
        path: path.resolve(__dirname, 'public/js/dist')
    }
};