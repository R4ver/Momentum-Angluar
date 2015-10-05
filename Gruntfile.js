/*global module:false*/
    module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                  'build/style.css' : 'src/**/*.sass'
                }
            }
        },

        watch: {

            css: {
                files: 'src/sass/*.sass',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ["sass"]);
};