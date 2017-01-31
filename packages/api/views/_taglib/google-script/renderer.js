const apis = {
	maps: 'https://maps.googleapis.com/maps/api/js'
}

/**
 * @param {Object} input
 * @param {string} input.api - string corresponding to apis' properties
 * @param {string|string[]} [input.libraries] - list of libraries to use
 * @param {string} [cb=calling.map] - specify the callback's name
 */
exports.render = (input, out) => {
	let {api, libraries, cb} = input;
	if (!Array.isArray(libraries)) libraries = [libraries];
	
	out.write('<script async src="');
	out.write(apis[api]);
	out.write('?key=');
	out.write(process.env.GOOGLE_TOKEN);
	if (libraries) {
		out.write('&libraries=');
		out.write(libraries.join(','));
	}
	out.write('&callback=');
	out.write(cb || 'calling.map');
}