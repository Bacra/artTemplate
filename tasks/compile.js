var compile = require('../build/compile');

module.exports = function(grunt) {
	grunt.registerMultiTask('artTemplateCompile', 'artTemplate pre compile', function() {
		var options = this.options({
			template: require('../node/template'),
			wrapSource: 'none'
		});

		if (!options.template || !options.template.compile) throw new Error('error template pram, no compile');
		
		this.files.forEach(function(file) {
			var src = file.src[0];
			var content = grunt.file.read(src);

			grunt.file.write(file.dest+'.js', compile(options.template, content, {
				filename: src,
				wrapSource: options.wrapSource
			}));	
		});	
	});
};


