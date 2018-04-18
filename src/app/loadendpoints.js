var path = require('path'),
    basePath = path.dirname(require.main.filename),
    resRoot =  basePath + "/app/resources",
    bodyParser = require('body-parser'),
    session = require('express-session'),
    express = require('express');

var routPath =  basePath+'/app/router/';
    userRouter = require(routPath+'user.router.js'),
    commentRouter = require(routPath+'comment.router.js'),
    fontRouter = require(routPath+'font.router.js');

module.exports = function(app){
    app.get('/', function (req, res) {
        res.sendfile("index.html",{root:resRoot+"/pages"});
    });
    app.use(session());
    app.use(session({ secret: 'HewieLiewDiewFewieJooe', cookie: { maxAge: 99999 }}));
    
    app.use('/user',userRouter);
    app.use('/page/', express.static(resRoot+"/pages") );
    app.use('/css/',  express.static(resRoot+"/css") );
    app.use('/js/',express.static(resRoot+"/js" ));

    app.use(bodyParser.json);
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use("/comment",commentRouter);
    app.use("/font",fontRouter);
    


};