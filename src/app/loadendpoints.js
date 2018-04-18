var path = require('path'),
    basePath = path.dirname(require.main.filename),
    resRoot =  basePath + "/app/resources",
    pageRoot =  basePath + "/app/resources/pages",
    bodyParser = require('body-parser'),
    session = require('express-session'),
    express = require('express');

var routPath =  basePath+'/app/router/',
    userRouter = require(routPath+'user.router.js'),
    commentRouter = require(routPath+'comment.router.js'),
    fontRouter = require(routPath+'font.router.js'),
	fs = require('fs'),
	tjs = require("templatesjs");

	tjs.dir = basePath+"/app/resources/templates/";
	


module.exports = function(app){
	var list = {
		title: "Home",
		icon: "https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=45&d=mm&r=g"
	} //attributes we want to display
	
	function renderRequestedPage(data, res) {
		tjs.setSync(data);   
		var output = tjs.renderAllSync(list);  
		res.write(output);  
		res.end(); 
	} //end function: renderRequestedPage
	
	
	app.get("/", function (req, res, next){
		var data = fs.readFileSync(pageRoot+'/index.html');
		renderRequestedPage(data, res);
	});
	
	app.get("/collection", function (req, res, next){
		list.title = "My Collection";
		var data = fs.readFileSync(pageRoot+'/collection.html');
		renderRequestedPage(data, res); 
	});
	
	app.get("/font", function (req, res, next){
		list.title = "Font";
		var data = fs.readFileSync(pageRoot+'/font.html');
		renderRequestedPage(data, res);  
	});
	
	app.get("/preferences" || "/prefs", function (req, res, next){
		list.title = "/preferences";
		var data = fs.readFileSync(pageRoot+'/preferences.html');
		renderRequestedPage(data, res); 
	});
	
	app.get("/login", function (req, res, next){
		list.title = "Login";
		var data = fs.readFileSync(pageRoot+'/login.html');
		renderRequestedPage(data, res); 
	});
	
	app.get("/signup", function (req, res, next){
		list.title = "Signup";
		var data = fs.readFileSync(pageRoot+'/signup.html');
		renderRequestedPage(data, res); 
	});
	
	app.get("/search", function (req, res, next){
		list.title = "Signup";
		var data = fs.readFileSync(pageRoot+'/search.html');
		renderRequestedPage(data, res); 
	});
	
	app.get("/user", function (req, res, next){
		list.title = "Signup";
		var data = fs.readFileSync(pageRoot+'/user.html');
		renderRequestedPage(data, res); 
	});
	
    app.use(session());
    app.use(session({ secret: 'HewieLiewDiewFewieJooe', cookie: { maxAge: 99999 }}));
    
    app.use('/user',userRouter);
    app.use('/page/', express.static(resRoot+"/pages") );
    app.use('/css/',  express.static(resRoot+"/css") );
    app.use('/js/',express.static(resRoot+"/js" ));
    app.use('/webfonts/',express.static(resRoot+"/webfonts"));

    app.use(bodyParser.json);
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use("/comment",commentRouter);
    app.use("/font",fontRouter);
	
	
	
};


 