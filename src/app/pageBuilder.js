var path = require('path'),
	contentDir = path.dirname(require.main.filename) + "/app/views/";
	
const pug = require('pug');
	
function buildHomePage(){
	const compiled = pug.compileFile(contentDir + "index.pug");
	return pug.render(compiled());
}


module.exports = {
	homePage: buildHomePage
}