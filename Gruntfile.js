// 
/*!
 * Akf0676 Gruntfile.js
 * https://github.com/akf0676/code-lab
 * @author Andy Farmer
 * 
 * @description our wrapper function (required by grunt and its plugins) all configuration goes inside this function
 * 
 */
'use strict';
/**
 * Grunt Module
 */
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project object
     */
    project: {
    	  src: 'src',
    	  css: [
    	    '<%= project.src %>/scss/style.scss'
    	  ],
    	  js: [
    	    '<%= project.src %>/js/*.js'
    	  ]
    },
    /**
     * Project banner
     */
    tag: {
    	  banner: 'hello'
    	},
    // all of our configuration will go here
    	/**
    	 * Sass
    	 */
    	sass: {
    	  dev: {
    	    options: {
    	      style: 'expanded',
    	      sourcemap: 'none',
    	    },
    	    files: {
    	      'css/style.css': '<%= project.css %>'
    	    }
    	  },
    	  dist: {
    	    options: {
    	      style: 'compressed',
    	      sourcemap: 'none',
    	    },
    	    files: {
    	      'css/style.min.css': '<%= project.css %>'
    	    }
    	  }
    	},
    /**
     * Watch
     */
    watch: {
      sass: {
        files: '<%= project.src %>/Scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },
      sassProd: {
          files: '<%= project.src %>/Scss/{,*/}*.{scss,sass}',
          tasks: ['sass:dist']
        }
    },
    // configure jshint to validate js files -----------------------------------
	jshint: {
	  options: {
	    reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
	  },
	
	  // when this task is run, lint the Gruntfile and all js files in src
	  build: ['Gruntfile.js', '<%= project.js %>']
	},
  
	// Uglify
	uglify: {
		options: {
	      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		 build: {
	        files: {
	          'js/<%= pkg.name %>.min.js': ['src/js/magic.js', 'src/js/magic2.js']
	        }
	      }
	 }  	
  
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'watch'
  ]);

};