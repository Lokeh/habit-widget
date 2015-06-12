module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js',
      },
      all: ['./js/src/*.js' ],
      options: {
        additionalSuffixes: ['.js']
      }
    },
    react: {
      files: {
        expand: true,
        cwd: 'js/src',
        src: ['**/*.js'],
        dest: 'js/build',
        ext: '.js'
      }
    },
    watch: {
      gruntfile: {
        'files': 'Gruntfile.js',
        'tasks': ['jshint:gruntfile']
      },
      src: {
        files: 'js/src/**/*.js',
        tasks: ['default']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-react');

  // Default task(s).
  grunt.registerTask('default', ['jshint:all', 'react']);

};