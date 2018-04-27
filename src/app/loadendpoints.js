var path = require('path'),
    basePath = path.dirname(require.main.filename),
    resRoot =  basePath + "/app/resources",
    bodyParser = require('body-parser'),
    session = require('express-session'),
    express = require('express');

var routPath =  basePath+'/app/router/',
    userRouter = require(routPath+'user.router.js'),
    commentRouter = require(routPath+'comment.router.js'),
	fontRouter = require(routPath+'font.router.js'),
	pageRouter = require(routPath+"page.router.js");
	


module.exports = function(app){
	app.use(bodyParser.json);
    app.use(bodyParser.urlencoded({ extended: true })); 
    
    app.use(session());
	app.use(session({ secret: 'HewieLiewDiewFewieJooe', cookie: { maxAge: 99999 }}));
    
    app.use('/',pageRouter);	
    app.use('/users',userRouter);
    app.use('/page/', express.static(resRoot+"/pages") );
    app.use('/css/',  express.static(resRoot+"/css") );
    app.use('/js/',express.static(resRoot+"/js" ));
	app.use('/webfonts/',express.static(resRoot+"/webfonts"));

    app.use("/comment",commentRouter);
    app.use("/font",fontRouter);
    
	
	
	
};


 