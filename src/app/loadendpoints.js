var fontModel = require('./data/font.model.js');

module.exports = function(app){
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });
	
	app.get('/test/',function(req,res){
		res.send( fontModel.test() );
	});
};