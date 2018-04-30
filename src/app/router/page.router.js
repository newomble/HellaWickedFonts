var express = require('express'),
    pageLoader = require("./page.loader.js"),
    pageRouter = express.Router();

pageRouter.get("/", function (req, res, next){
    pageLoader.homePage(req,res);
});

pageRouter.get("/collection", function (req, res, next){
    if(req.session.loggedIn){
        pageLoader.collectionPage(req.session.user.user_id,req,res);
    }else{
        pageLoader.homePage(req,res);
    }
});

pageRouter.get("/collection/:id", function (req, res, next){
    if(req.params.id){
        pageLoader.collectionPage(req.params.id,req,res);
    }else{
        pageLoader.homePage(req,res);
    }
});

pageRouter.get("/font/:id", function (req, res, next){
    if(req.params.id){
        pageLoader.fontPage( req.params.id,req,res);
    }else{
        pageLoader.homePage(req,res);
    }
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
    pageLoader.searchPage(req,res);
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

pageRouter.get("/test",function(req,res){
    pageLoader.text(req,res);
})

module.exports = pageRouter;



