var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    pageRoot =  basePath + "/app/resources/pages",
    pageRouter = express.Router(),
	gravatar_base_url = "https://www.gravatar.com/avatar/";

var fs = require('fs'),
    tjs = require("templatesjs");
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
    list.title = "/preferences";
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
	list.user_icon = gravatar_base_url + "fd675280dec9225f301bd5c90dc2bf1b" + "?s=150&d=mm&r=g";
	list.user_id = 2;
    var data = fs.readFileSync(pageRoot+'/user.html');
    renderRequestedPage(data, res); 
});

module.exports = pageRouter;


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