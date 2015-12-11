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
                    sourceMapName: 'app/build/kanye.min.map'
                },
                files: {
                    'app/build/kanye.min.js': [
                        'app/app.js',
                        'app/public/services/*.js',
                        'app/public/*.js'
                    ]
                }
            }
        },
        watch: {
            code: {
                files: [
                    'app/app.js',
                    'app/public/services/*.js',
                    'app/public/*.js'
                ],
                tasks: ['dev'],
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
    grunt.registerTask('default', []);
    grunt.registerTask('dev', ['uglify:js']);

};