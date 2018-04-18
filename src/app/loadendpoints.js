var path = require('path'),
    basePath = path.dirname(require.main.filename),
    resRoot =  basePath + "/app/resources",
    apiRouter = require(basePath+'/app/router/api.router.js'),
    userRouter = require(basePath+'/app/router/user.router.js'),
    session = require('express-session'),
    express = require('express');


module.exports = function(app){
    app.use(session());
    app.use(session({ secret: 'HewieLiewDiewFewieJooe', cookie: { maxAge: 99999 }}));
    
    app.use('/api',apiRouter);
    app.use('/user',userRouter);
    app.use('/page/', express.static(resRoot+"/pages") );
    app.use('/css/',  express.static(resRoot+"/css") );
    app.use('/js/',express.static(resRoot+"/js" ));

    app.get('/', function (req, res) {
        res.sendfile("index.html",{root:resRoot+"/pages"});
    });
};