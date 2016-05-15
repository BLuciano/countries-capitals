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
      build: ['Gruntfile.js', 'app/**/*.js', '!app/bower_components/**']
    },

    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'build/js/app.min.js': 'app/js/app.js'
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

    concat : {
      dist: {
        src: ['app/main.js', 'app/**/*.js', '!app/bower_components/**'],
        dest: 'build/js/app.js',
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

    copy: {
      files: {
        flatten : true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'build/',
        expand: true
      }
    },

    watch: {
      stylesheets: {
        files: ['app/**/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: 'app/**/*.js',
        tasks: ['jshint', 'concat']
      },
      html: {
        files : 'app/**/*.html',
        tasks : ['copy']
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  //TASKS
  grunt.registerTask('default', ['clean:dev', 'jshint', 'concat', 'sass', 'copy']);
  grunt.registerTask('minify', ['clean:min', 'cssmin', 'uglify']);
  grunt.registerTask('bowerConcat', ['bower_concat']);
};