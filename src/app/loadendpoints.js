var path = require('path'),
    basePath = path.dirname(require.main.filename),
    resRoot =  basePath + "/app/resources",
    apiRouter = require(basePath+'/app/router/api.router.js'),
    express = require('express');


module.exports = function(app){
    app.get('/', function (req, res) {
        res.sendfile("index.html",{root:resRoot+"/pages"});
    });
    
    app.use('/api',apiRouter);
    app.use('/page/', express.static(resRoot+"/pages") );
    app.use('/css/',  express.static(resRoot+"/css") );
    app.use('/js/',express.static(resRoot+"/js" ));
};