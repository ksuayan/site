module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        //  Concatenate external JS and CSS libraries into
        //  corelib.js and corelib.css.

        clean: ["public/dist","public/build"],
        copy: {
            main: {
                expand: true,
                cwd: 'public/fonts/',
                src:  '**',
                dest: 'public/dist/fonts/'
            }
        },
        bower_concat: {
            all: {
                dest: {
                    js:  'public/build/_bower.js',
                    css: 'public/build/_bower.css'
                },
                mainFiles: {
                    "font-awesome": [
                        "css/font-awesome.css"
                    ],
                    "bootstrap": [
                        "dist/css/bootstrap.css",
                        "dist/js/bootstrap.js"
                    ]
                },
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
                dest: 'public/build/extras-<%= pkg.name %>.js'
            },
            site: {
                src: [
                      'public/js/gb.js',
                      'public/js/gb-templates.js',
                      'public/js/gb-util.js',
                      'public/js/gb-ui.js',
                      'public/js/gb-touch-surface.js',
                      'public/js/gb-lazy-image.js',
                      'public/js/gb-preloadable-image.js',
                      'public/js/gb-tile.js',
                      'public/js/gb-timeout-cycle.js',
                      'public/js/jquery.fullscreen.js',
                      'public/js/jquery.search.js',
                      'public/js/gb-timeline.js',
                      'public/js/gb-fullscreen.js',
                      'public/js/gb-stage.js',
                      'public/js/gb-content-manager.js',
                      'public/js/main.js'],
                dest: 'public/build/<%= pkg.name %>.js'
            },
            all: {
                src: [
                    '<%= concat.extras.dest %>',
                    'public/dist/js/corelib.min.js',
                    'public/dist/js/<%= pkg.name %>.min.js'
                ],
                dest: 'public/dist/js/all-<%= pkg.name %>.min.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            site: {
                files: {
                    'public/dist/js/<%= pkg.name %>.min.js': ['<%= concat.site.dest %>']
                }
            },
            core: {
                files: {
                    'public/dist/js/corelib.min.js': [
                        '<%= bower_concat.all.dest.js %>',
                        'public/js/videojs/video.js',
                        'public/js/raphael-extensions.js'
                    ]
                }
            }
        },
        cssmin: {
            core: {
                options: {
                    banner: '/*! corelib.min.css 1.0.0 | @ksuayan */'
                },
                files: {
                    'public/dist/css/corelib.min.css': [
                      '<%= bower_concat.all.dest.css %>',
                      'public/js/videojs/video-js.css'
                    ]
                }
            },
            site: {
                options: {
                    banner: '/*! site.min.css 1.0.0 | @ksuayan */'
                },
                files: {
                    'public/dist/css/main.min.css': [
                        'public/css/main.css'
                    ]
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
        jsdoc: {
            dist : {
                src: ['<%= concat.dist.src %>', 'src/*.js', 'test/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('jsdoc',   ['jsdoc']);

    grunt.registerTask('hb',[
        'handlebars',
        'concat:site',
        'uglify:site',
        'concat:all'
    ]);

    grunt.registerTask('core', [
        'bower_concat',
        'uglify:core',
        'cssmin:core'
    ]);

    grunt.registerTask('site',[
        'handlebars',
        'jshint',
        'concat:site',
        'uglify:site',
        'cssmin:site'
    ]);

    grunt.registerTask('default',[
        'clean',
        'copy',
        'bower_concat', // all bower imported libraries in bower.json
                        // (supposedly!)
        'handlebars', // *.hbs -> *.js
        'jshint', // sanity checks

        'cssmin:core',   // -> public/dist/css/corelib.min.css'
        'cssmin:site',    // -> public/dist/css/main.min.css
        'concat:extras', // -> public/build/extras-site.js
        'concat:site',   // -> public/build/site.js
        'uglify:core',   // -> public/dist/js/corelib.min.js
        'uglify:site',   // -> public/dist/js/site.min.js
        'concat:all'     // -> public/dist/js/all-site.min.js
    ]);
};
