
module.exports = function(grunt) {
	grunt.registerMultiTask('artTemplateCompile', 'artTemplate pre compile', function() {
		var options = this.options({
			template: require('../node/template'),
			wrapSource: 'none'
		});

		if (!options.template || !options.template.compile) throw new Error('error template pram, no compile');
		var template = options.template;
		var wrapSource = generateWrapSource(options.wrapSource);
		
		this.files.forEach(function(file) {
			var src = file.src[0];
			var content = grunt.file.read(src);
			var render = template.compile(content, {filename: src}).toString();

			render = wrapSource(render);
			grunt.file.write(file.dest+'.js', render);	
		});	
	});
};


function generateWrapSource(wrapSource) {
	if (typeof wrapSource == 'function') return wrapSource;

	switch (wrapSource) {
		case 'sea':
		case 'seajs':
			return function(data) {
				return 'define(){module.exports = '+data+'}';
			};
		case 'node':
		case 'nodejs':
			return function(data) {
				return 'module.exports = '+data;
			};
		default:
			return function(data) {return data};
	}
}

