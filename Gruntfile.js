module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //uglify: {
        //    options: {
        //        mangle: false
        //    },
        //    js: {
        //        options: {
        //            sourceMap: true,
        //            sourceMapName: 'public/app/build/kanye.min.map'
        //        },
        //        files: {
        //            'public/app/build/kanye.min.js': [
        //                'public/app.js',
        //                'public/app/services/*.js',
        //                'public/app/controllers/*.js'
        //            ]
        //        }
        //    }
        //},
        concat: {
            dist: {
                src: [
                    //js to be concatenated
                    'public/app.js',
                    'public/app/services/*.js',
                    'public/app/controllers/*.js'
                ],
                dest: 'public/app/build/kanye.min.js'
            }
        },
        watch: {
            code: {
                files: [
                    'public/app.js',
                    'public/app/services/*.js',
                    'public/app/controllers/*.js',
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('build', [
        'concat:dist',
        'watch:code'
    ]);

};