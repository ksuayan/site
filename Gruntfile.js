module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //  Concatenate external JS and CSS libraries into
        //  corelib.js and corelib.css.

        bower_concat: {
            all: {
                dest: 'public/js/dist/corelib.js',
                cssDest: 'public/css/corelib.css',
                bowerOptions: {
                    relative: false
                }
            }
        },

        // Precompile external Handlebar Templates.
        handlebars: {
            compile: {
                options: {
                    // namespace: "gb.templates",
                    wrapped: true
                },
                files: {
                    "public/js/gb-templates.js": [
                        "handlebars/*.hbs"
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: '\n\n'
            },
            extras: {
                src: [
                    'public/js/handlebars/handlebars.runtime.min.js'
                ],
                dest: 'public/js/dist/extras-<%= pkg.name %>.js'
            },
            site: {
                src: [
                      'public/js/gb.js',
                      'public/js/gb-templates.js',
                      'public/js/gb-util.js',
                      'public/js/gb-ui.js',
                      'public/js/gb-touch-surface.js',
                      'public/js/gb-preloadable-image.js',
                      'public/js/gb-tile.js',
                      'public/js/gb-timeout-cycle.js',
                      'public/js/jquery.fullscreen.js',
                      'public/js/jquery.search.js',
                      'public/js/gb-timeline.js',
                      'public/js/gb-fullscreen.js',
                      'public/js/gb-stage.js',
                      'public/js/gb-content-manager.js',
                      'public/js/gb-socket-client.js',
                      'public/js/main.js'],
                dest: 'public/js/dist/<%= pkg.name %>.js'
            },
            all: {
                src: [
                    '<%= concat.extras.dest %>',
                    '<%= bower_concat.all.dest %>',
                    '<%= concat.site.dest %>'
                ],
                dest: 'public/js/dist/all-<%= pkg.name %>.min.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            site: {
                files: {
                    'public/js/dist/<%= pkg.name %>.min.js': ['<%= concat.site.dest %>']
                }
            },
            core: {
                files: {
                    'public/js/dist/corelib.min.js': ['<%= bower_concat.all.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            // files: ['Gruntfile.js', 'public/js/**/*.js', 'test/**/*.js'],
            files: ['Gruntfile.js', '<%= concat.site.src %>'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    gb: true,
                    jQuery: true,
                    $: true,
                    console: true,
                    module: true,
                    document: true
                },
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                browser: true,
                scripturl: true,
                laxbreak: true
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        },
        jsdoc: {
            dist : {
                src: ['<%= concat.dist.src %>', 'src/*.js', 'test/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('test',    ['jshint', 'qunit']);
    grunt.registerTask('jsdoc',   ['jsdoc']);
    grunt.registerTask('core',    ['bower_concat','uglify:core']);

    grunt.registerTask('site',[
        'handlebars',
        'jshint',
        'concat:site',
        'uglify:site'
    ]);

    grunt.registerTask('default',[
        'bower_concat',
        'handlebars',
        'jshint',
        'concat:extras',
        'concat:site',
        'uglify:core',
        'uglify:site',
        'concat:all'
    ]);
};
