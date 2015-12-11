module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle:false
            },
            build: {
                src: ['app/app.js', 'app/public/services/*.js','app/public/*.js'],
                dest: 'app/build/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            files: 'app/public/*',
            task: ['build'],
            options: {
                spawn:false
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', ['uglify', 'watch']);

};