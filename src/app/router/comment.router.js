var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    controller = basePath + "/app/controlla/general.face.js",
    consts = basePath + "/api/lib/constants.js",
    commentRouter = express.Router();


commentRouter.get("/user/:uname",function(req,res){
    controller.userComments(uName);
});

commentRouter.get("/font/:fontId",function(req,res){
    var fid = req.query.fontId;
    var comments = controller.fontComments(fid,res);
});

commentRouter.post("/rate",function(req,res){
    if(!req.session.loggedIn){
        res.send(false);
    } else {
        controller.newRating(req.session.id,consts.COMMENT,req.body.id,req.body.rating,res);
    }
});

commentRouter.post("/",function(req,res){
    if( ! req.session.loggedIn || !req.body.comment ){
        res.send(false);
    }else{
        controller.newComment(req.session.id,req.body.id,req.body.comment,res);
    }
});

module.exports = commentRouter;