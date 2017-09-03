var puglatizer = require('puglatizer');

// pass in the template directory and what you want to save the output file as
puglatizer(
    __dirname + '/views/includes',
    __dirname + '/public/js/dist/pug-templates.js',
    {
        pug: {
            compileClient: true,
            client: true
        }
    }, // Optional
    function (err, templates) {
        console.log(templates);
        console.log(err || 'Success!');
    }
);