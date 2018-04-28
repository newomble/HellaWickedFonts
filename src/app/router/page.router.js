var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    pageRoot =  basePath + "/app/resources/pages",
    pageLoader = require("./page.loader.js"),
    pageRouter = express.Router();

var     fs = require('fs'),
tjs = require("templatesjs");

//set the default directory
tjs.dir = basePath+"/app/resources/templates/";

pageRouter.get("/", function (req, res, next){
    pageLoader.homePage(req,res);
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

pageRouter.get("/prefs" || "/preferences", function (req, res){
    if( req.session.loggedIn){
        pageLoader.prefPage(req,res); 
    } else {
        pageLoader.signup(req,res);
    }
});

pageRouter.get("/login", function (req, res, next){
    pageLoader.loginPage(req,res);
});

pageRouter.get("/signup", function (req, res, next){
    pageLoader.signup(req,res);
});

pageRouter.get("/search", function (req, res, next){
    list.title = "Search";
    var data = fs.readFileSync(pageRoot+'/search.html');
    renderRequestedPage(data, res); 
});


pageRouter.get("/user/", function (req, res, next){
    if(req.session.user && req.session.user.user_id){
        pageLoader.userPage(req.session.user.user_id,req,res);
    }else{
        pageLoader.signup(req,res);
    }
});

pageRouter.get("/user/:id", function (req, res, next){
    if(req.params.id){
        pageLoader.userPage(req.params.id,req,res);
    }else if(req.session.user && req.session.user.user_id){
        pageLoader.userPage(req.session.user.user_id,req,res);
    }else{
        pageLoader.homePage(req,res);
    }
});

module.exports = pageRouter;



