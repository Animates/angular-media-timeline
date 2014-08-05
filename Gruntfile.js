
'use strict';

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		timeline: {
			// configurable paths
			examples: require('./bower.json').appPath || 'examples',
			dist: 'dist'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= timeline.examples %>/{,*/}*.js', 'timeline.js'],
				tasks: ['jshint:build', 'uglify:build', 'copy:dist'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: [ '**.less' ],
				tasks: [ 'less:development', 'cssmin', 'copy:dist']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
			'<%= timeline.examples %>/{,*/}*.html',
					'<%= timeline.dist %>/styles/{,*/}*.css',
					'<%= timeline.dist %>/js/{,*/}*.js'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.',
						'<%= timeline.examples %>'
					]
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish'),
				ignores: ['**.min.js']
			},
			all: [
				'**.js'
			],
			build:{
				options: {
					reporter: 'jslint',
					reporterOutput: 'build/output/jshint-result.xml',
					force: true,
					ignores: ['**.min.js']
				},
				files: {
					src: ['**.js']
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= timeline.dist %>/*',
						'!<%= timeline.dist %>/.git*'
					]
				}]
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			build: {
				files:  {},
				src:    'timeline.js',
				dest:   'dist/js/timeline.min.js'
			}
		},
		less: {
			development: {
				options: {
				},
				files: {
					"dist/styles/timeline.css": "timeline.less"
				}
			}
		},
		copy: {
			dist : {
				files : [{ expand: true, src: ['timeline.js'], dest: 'dist/js/' }]
			}
		},
		cssmin: {
			dev: {
				src: ['dist/styles/timeline.css'],
				dest: 'dist/styles/timeline.min.css'
			}
		},

		// Automatically inject Bower components into the app
		'bowerInstall': {
			target: {

		    // Point to the files that should be updated when
		    // you run `grunt bower-install`
		    src: [
		      '<%= timeline.examples %>/index.html'
		    ],

		    // Optional:
		    // ---------
		    //cwd: '',
		    //dependencies: true,
		    //devDependencies: false,
		    //exclude: [],
		    //fileTypes: {},
		    ignorePath: '<%= timeline.examples %>/'
		    //overrides: {}
		  }
		}
	});

	grunt.registerTask('install-dep', function () {
		grunt.task.run('bowerInstall');
	});

	grunt.registerTask('package', ['jshint:build', 'less:development', 'cssmin', 'uglify:build', 'copy:dist']);

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:dist',
			'install-dep',
			'package',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('ci-build', ['package']);
	grunt.registerTask('default', ['serve']);
};
