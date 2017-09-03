var puglatizer = require('puglatizer');

// pass in the template directory and what you want to save the output file as
puglatizer(
    __dirname + '/../views/public',
    __dirname + '/../public/js/pug-templates.js',
    {
        jade: {
            compileDebug: false,
            client: true
        },
        transformMixins: true
    }, // Optional
    function (err, templates) {
        console.log(err || 'Success!');
    }
);