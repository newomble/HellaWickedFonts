var path = require('path'),
    resRoot = path.dirname(require.main.filename) + "/app/resources";


module.exports = function(app){
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    //Example: /css/main
    app.get('/css/:fileName',function(req,res){
        res.sendfile(req.params["fileName"]+".css", {root: resRoot+"/css"});
    });
    //Example: /js/collection
    app.get('/js/:fileName', function(req,res){
        res.sendfile(req.params["fileName"]+".js", {root: resRoot+"/js"});
    });
};