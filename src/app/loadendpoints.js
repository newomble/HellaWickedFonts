var fontModel = require('./data/font.model.js'),
	pageBuilder = require('./pageBuilder.js');


module.exports = function(app){
    app.get('/', function (req, res) {
        res.render(pageBuilder.homePage());
    });
};