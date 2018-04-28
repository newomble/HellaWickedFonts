var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    bodyParser = require("body-parser"),
    controller = require(basePath + "/app/controlla/index.face.js"),
    apiRouter = express.Router();
apiRouter.use(bodyParser.urlencoded({extended:true}));
apiRouter.use(bodyParser.json());

apiRouter.post("/login",function(req,res){
    var uName = req.body.username;
    var pword = req.body.password;

    controller.login(uName,pword,res,req);
});

apiRouter.route("/logout").post(function(req,res){
    req.session.destroy();
    res.send(true);
}).get(function(req,res){
    req.session.destroy();
    res.send(true);
});

apiRouter.route("/collection").post(function(req,res){
    //todo if logged int
    controller.newCollection(req.session.uid,req.body.fonts,res);
    
}).get(function(req,res){
        controller.getCollections(req.session.uid,res);
});

apiRouter.route("/signup").post(function(req,res){
    var uName = req.body.username;
    var pWord = req.body.password;
    var repWord = req.body.repassword;
    var fname = req.body.first_name;
    var lname = req.body.last_name;
    console.log( req.body );
    if( !pWord || pWord != repWord){
        res.send("Passwords do not match");
    }else{
        controller.newUser(uName,fname,lname,pWord,res);
    }
});

apiRouter.post("/rate",function(req,res){
    if(!req.session.loggedIn){
        res.send(false);
    } else {
        controller.newRating(req.session.id,consts.COMMENT,req.body.id,req.body.rating,res);
    }
});

apiRouter.post("/comment",function(req,res){
    if( ! req.session.loggedIn || !req.body.comment || !req.body.id ){
        res.send(false);
    }else{
        controller.newComment(req.session.id,req.body.id,req.body.comment,res);
    }
});

apiRouter.post("/search/fonts",function(req,res){
    var txt = req.body.search_string;
    var uid = req.body.user_id;
    var type = req.body.type;
    if(!txt){
        res.send("Missing Search Text");
    }else if(!type){
        res.send("Missing Type Field");
    }else if(uid){
        controller.searchUserCollection(uid, txt, type, res);
    } else {
        controller.searchFonts(uid, txt, type, res);
    }

});

apiRouter.post("/search/users",function(req,res){
    var txt = req.body.search_string;
    if(!txt){
        res.send("Missing Search Text");
    } else {
        controller.searchUser(txt,res);
    }
});

module.exports = apiRouter;

function isLoggedIn(req){
    req.session.uid =2;
    return true;
    // return (req.session.loggedIn == true);
}