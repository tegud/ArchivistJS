module.exports = function(grunt) {
    var src = 'src/*.js';
    var tests = 'test/tests/**/*.js';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: [src, tests],
                tasks: ['jshint', 'jscs', 'simplemocha']
            }
        },
        simplemocha: {
            options: {
                reporter: 'spec'
            },
            all: tests
        },
        jshint: {
            all: [src, tests]
        },
        jscs: {
            src: [src, tests],
            options: {
                config: '.jscs.json'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs-checker");

    grunt.registerTask('default', ['jshint', 'jscs', 'simplemocha']);
};