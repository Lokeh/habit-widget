module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js',
      },
      all: ['./src/**/*.js', './src/**/*.es6'],
      options: {
        // additionalSuffixes: ['.js'],
        esnext: true
      }
    },
    babel: {
        options: {
            sourceMap: true
        },
        all: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.js', '**/*.es6'],
                dest: 'build/',
                ext: '.js'
            }]
        }
    },
    watch: {
      gruntfile: {
        'files': 'Gruntfile.js',
        'tasks': ['jshint:gruntfile']
      },
      src: {
        files: ['src/**/*.js', 'src/**/*.es6'],
        tasks: ['default']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-babel');

  // Default task(s).
  grunt.registerTask('default', ['jshint:all', 'babel']);

};