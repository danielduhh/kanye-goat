module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: false
            },
            js: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'public/app/build/kanye.min.map'
                },
                files: {
                    'public/app/build/kanye.min.js': [
                        'public/app.js',
                        'public/app/services/*.js',
                        'public/app/*.js'
                    ]
                }
            }
        },
        watch: {
            code: {
                files: [
                    'public/app.js',
                    'public/app/services/*.js',
                    'public/app/*.js,',
                    'public/app/test/*.js',
                    'public/app/main.js',
                    'public/index.html'
                ],
                tasks: ['build'],
                options: {
                    spawn:false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('build', [
        'uglify:js',
        'watch:code'
    ]);

};