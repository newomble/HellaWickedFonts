var path = require('path'),
    basePath = path.dirname(require.main.filename),
    resRoot =  basePath + "/app/resources",
    apiRouter = require(basePath+'/app/router/api.router.js');


module.exports = function(app){
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });
    
    app.get('/api',apiRouter);

    //Example: /css/main
    app.get('/css/:fileName',function(req,res){
        res.sendfile(req.params["fileName"]+".css", {root: resRoot+"/css"});
    });
    //Example: /js/collection
    app.get('/js/:fileName', function(req,res){
        res.sendfile(req.params["fileName"]+".js", {root: resRoot+"/js"});
    });
};