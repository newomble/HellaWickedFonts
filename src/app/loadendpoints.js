var path = require('path'),
    basePath = path.dirname(require.main.filename),
    resRoot =  basePath + "/app/resources",
    bodyParser = require('body-parser'),
    urlEncodedParser = bodyParser.urlencoded({extended:false}),
    session = require('express-session'),
    express = require('express');

var routPath =  basePath+'/app/router/',
    apiRouter = require(routPath+"api.router.js"),
	pageRouter = require(routPath+"page.router.js");
	


module.exports = function(app){
    
    app.use(session());
	app.use(session({ secret: 'HewieLiewDiewFewieJooe', cookie: { maxAge: 99999 }}));
    
    app.use('/api/',apiRouter);
    app.use('/page/', express.static(resRoot+"/pages") );
    app.use('/css/',  express.static(resRoot+"/css") );
    app.use('/js/',express.static(resRoot+"/js" ));
	app.use('/webfonts/',express.static(resRoot+"/webfonts"));

    // app.use("/font",urlencoded,fontRouter);
    
    app.use('/',pageRouter);	
    
    app.use(function(req,res){
        res.redirect("/");
    })
	
};


 