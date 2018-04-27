var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    controller = require(basePath + "/app/controlla/user.face.js"),
    userRouter = express.Router();

userRouter.post("/login",function(req,res){
    var uName = req.body.username;
    var pword = req.body.password;
    controller.login(uName,pword,res,req);
});

userRouter.route("/logout").post(function(req,res){
    req.session.destroy();
    res.send(true);
}).get(function(req,res){
    req.session.destroy();
    res.send(true);
});


userRouter.get("/collection/:id",function(req,res){
    controller.getCollection(res.query.id,res);
});

userRouter.route("/collection").post(function(req,res){
    //todo if logged int
    controller.newCollection(req.session.uid,req.body.fonts,res);
    
}).get(function(req,res){
        controller.getCollections(req.session.uid,res);
});

userRouter.route("/signup").post(function(req,res){
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

userRouter.get("/getUser",function(req,res){
    if(isLoggedIn(req)){
        controller.getUserData(req.session.uid,res);
    }else{
        res.send(false);
    }
})

module.exports = userRouter;

function isLoggedIn(req){
    req.session.uid =2;
    return true;
    // return (req.session.loggedIn == true);
}