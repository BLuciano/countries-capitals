module.exports = function(grunt) {
  //require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        esversion : 6
      },
      build: ['Gruntfile.js', 'app/**/*.js']
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'build/js/app.min.js': 'build/js/app.js'
        }
      }
    },

    sass: {
      build: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/css/styles.css' : 'app/styles.scss'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'build/css/styles.min.css': 'build/css/styles.css'
        }
      }
    },

    //Call this every time a new bower component is installed
    bower_concat : {
      all :{
        dest: {
          'js' : 'build/js/bower.js',
          'css' : 'build/css/bower.css'
        },
        dependencies :  {
          'angular-animate' : 'angular',
          'angular-route' : 'angular'        
        }
      }
    },

    clean: {
      dev : [
        './build/js/app.js',
        './build/css/styles.css',
        './build/css/styles.css.map'
      ],

      min : [
        './build/js/app.min.js',
        './build/css/styles.min.css'
      ]
    },

    watch: {
      stylesheets: {
        files: ['app/**/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: 'app/**/*.js',
        tasks: ['jshint']
      }
    }
  });

  // LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-concat');

  //TASKS
  grunt.registerTask('default', ['clean:dev', 'jshint', 'sass']);
  grunt.registerTask('minify', ['clean:min', 'cssmin', 'uglify']);
  grunt.registerTask('bowerConcat', ['bower_concat']);
};