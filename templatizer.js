var templatizer = require('templatizer');

// pass in the template directory and what you want to
// save the output file as. That's it!
templatizer(__dirname + '/views/includes/mixins.jade',
    __dirname + '/public/js/dist/jade-templates.js',
    {
        dontRemoveMixins: true,
        inlineJadeRuntime: true,
        jade: {
            compileClient: true,
            client: true,
            transformMixins: true
        }
    },
    function(err, templates){
        console.log("Done?", err, templates);
    }
);
