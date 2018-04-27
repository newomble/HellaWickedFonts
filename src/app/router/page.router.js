var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    pageRoot =  basePath + "/app/resources/pages",
    pageRouter = express.Router(),
	gravatar_base_url = "https://www.gravatar.com/",
	gravatar_avatar_url = gravatar_base_url + "avatar/";

var fs = require('fs'),
    tjs = require("templatesjs");

//set the default directory
tjs.dir = basePath+"/app/resources/templates/";

pageRouter.get("/", function (req, res, next){
    var data = fs.readFileSync(pageRoot+'/index.html');
    renderRequestedPage(data, res);
});

pageRouter.get("/collection", function (req, res, next){
    list.title = "My Collection";
    var data = fs.readFileSync(pageRoot+'/collection.html');
    renderRequestedPage(data, res); 
});

pageRouter.get("/font", function (req, res, next){
    list.title = "Font";
    var data = fs.readFileSync(pageRoot+'/font.html');
    renderRequestedPage(data, res);  
});

pageRouter.get("/prefs" || "/preferences", function (req, res, next){
    list.title = "Your Preferences";
	list.username = "memrie";
	list.email = "et5392@rit.edu";
	list.first_name = "erika";
	list.last_name = "tobias";
	list.gravatar_base_url = gravatar_base_url;
	list.user_id = 2;
    var data = fs.readFileSync(pageRoot+'/preferences.html');
    renderRequestedPage(data, res); 
});

pageRouter.get("/login", function (req, res, next){
    list.title = "Login";
    var data = fs.readFileSync(pageRoot+'/login.html');
    renderRequestedPage(data, res); 
});

pageRouter.get("/signup", function (req, res, next){
    list.title = "Signup";
    var data = fs.readFileSync(pageRoot+'/signup.html');
    renderRequestedPage(data, res); 
});

pageRouter.get("/search", function (req, res, next){
    list.title = "Search";
    var data = fs.readFileSync(pageRoot+'/search.html');
    renderRequestedPage(data, res); 
});

pageRouter.get("/user", function (req, res, next){
    list.title = "View User (memrie)";
	list.username = "memrie";
					// the base gravatar url / md5 email / cosmetic (icon size)
	list.user_icon = gravatar_avatar_url + "fd675280dec9225f301bd5c90dc2bf1b" + "?s=150&d=mm&r=g";
	list.user_id = 2;
    var data = fs.readFileSync(pageRoot+'/user.html');
    renderRequestedPage(data, res); 
});

module.exports = pageRouter;


var list = {
    title: "Home",
	
    //if the user is logged in, show "logged in" nav template
	nav: fs.readFileSync( basePath+"/app/resources/templates/logged_in.html"),
	//if the user is logged out, show "logged in" nav template
    //nav: fs.readFileSync( basePath+"/app/resources/templates/logged_out.html"),
	
	// the base gravatar url / md5 email / cosmetic (icon size)
    icon: gravatar_avatar_url + "fd675280dec9225f301bd5c90dc2bf1b" + "?s=45&d=mm&r=g"
} //attributes we want to display





function renderRequestedPage(data, res) {
    tjs.setSync(data);   
    var output = tjs.renderAllSync(list);  
    res.write(output);  
    res.end(); 
} //end function: renderRequestedPage

