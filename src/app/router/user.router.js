var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    controller = basePath + "/app/controlla/user.face.js",
    userRouter = express.Router();

userRouter.post("/login",function(req,res){
    var uName = req.body.username;
    var pword = req.body.password;

    var uid = controller.login(uName,pword);
    if( uid ){
        req.session.loggedIn = true;
        req.session.uid = uid;
        res.send(true);    
    } else{
        res.send(false);
    }
});
userRouter.route("/logout").post(function(req,res){
    req.session.destroy();
    res.send(true);
}).get(function(req,res){
    req.session.destroy();
    res.send(true);
});


userRouter.get("/collection/:id",function(req,res){
    res.send(controller.getCollection(res.query.id));
});

userRouter.route("/collection").post(function(req,res){
    //todo if logged int
    res.send(
        controller.newCollection(req.session.uid,req.body.fonts)
    );
}).get(function(req,res){
    res.send(
        controller.getCollections(req.session.uid)
    );
});


module.exports = userRouter;
