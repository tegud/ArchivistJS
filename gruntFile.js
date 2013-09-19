module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['jshint', 'simplemocha']
      }
    },
    simplemocha: {
      options: {
        reporter: 'tap'
      },
      all: ['test/**/*.js']
    },
  	jshint: {
  	  all: ['src/*.js', 'test/*.js']
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'simplemocha']);
};