module.exports = function(grunt) {

	grunt.initConfig({
		artTemplateCompile: {
			df: {
				cwd: __dirname+'/tpl',
				src: ['*.html'],
				dest: 'tmp',
				expand: true,
				filter: 'isFile'
			},
			seajs:{
				options: {
					wrapSource: 'seajs'
				},
				cwd: __dirname+'/tpl',
				src: ['*.html'],
				dest: 'tmp/seajs',
				expand: true,
				filter: 'isFile'
			},
			nodejs:{
				options: {
					wrapSource: 'nodejs'
				},
				cwd: __dirname+'/tpl',
				src: ['*.html'],
				dest: 'tmp/nodejs',
				expand: true,
				filter: 'isFile'
			},
		}
	});

	grunt.loadTasks('../tasks');
	grunt.registerTask('default', ['artTemplateCompile']);
};
