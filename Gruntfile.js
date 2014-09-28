module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
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
            dist: {
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
                dest: 'public/js/<%= pkg.name %>.js'
            },
            koken: {
                src: [
                    'public/js/gb.js',
                    'public/js/gb-util.js',
                    'public/js/gb-ui.js',
                    'public/js/gb-tile.js',
                    'public/js/koken/koken-main.js'],
                dest: 'public/js/dist/koken-<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                sourceMap: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            },
            koken: {
                files: {
                    'public/js/dist/koken-<%= pkg.name %>.min.js': ['<%= concat.koken.dest %>']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            // files: ['Gruntfile.js', 'public/js/**/*.js', 'test/**/*.js'],
            files: ['Gruntfile.js', '<%= concat.dist.src %>'],
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

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('hb', ['handlebars']);
    grunt.registerTask('koken', ['jshint','concat:koken','uglify:koken']);
    grunt.registerTask('default', ['handlebars','jsdoc','jshint','concat','uglify']);

};