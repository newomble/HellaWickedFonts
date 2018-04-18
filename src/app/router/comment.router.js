var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    controller = basePath + "/app/controlla/user.face.js",
    consts = basePath + "/api/lib/constants.js",
    commentRouter = express.Router();


commentRouter.get("/user/:uname",function(req,res){
    var uName = req.body.uname;
    var comments = controller.userComments(uName);
    res.send(comments);
});

commentRouter.get("/font/:fontId",function(req,res){
    var fid = req.body.fontId;
    var comments = controller.fontComments(fid);
    res.send(comments);
});

commentRouter.post("/rate",function(req,res){
    if(!req.session.loggedIn){
        res.send(false);
    } else {
        controller.newRating(req.session.id,consts.COMMENT,req.body.id,req.body.rating);
        res.send(true);
    }
});

commentRouter.post("/",function(req,res){
    if( ! req.session.loggedIn || !req.body.comment ){
        res.send(false);
    }else{
        controller.newComment(req.session.id,req.body.id,req.body.comment);
        res.send(true);
    }
});