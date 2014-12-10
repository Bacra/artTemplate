module.exports = function(template, content, options) {
	options || (optioins = {});
	var render = template.compile(content, {filename: options.filename}).toString();

	return generateWrapSource(options.wrapSource)(render);
};


function generateWrapSource(wrapSource) {
	if (typeof wrapSource == 'function') return wrapSource;

	switch (wrapSource) {
		case 'sea':
		case 'seajs':
			return function(data) {
				return 'define(function(require, exports, module){module.exports = '+data+'})';
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

