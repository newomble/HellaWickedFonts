var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    controller = basePath + "/app/controlla/font.face.js",
    fontRouter = express.Router();


fontRouter.get('/id/:id',function(req,res){
    res.send(controller.getFontById(req.query.id));
});

fontRouter.get('/name/:name',function(req,res){
    res.send(controller.getFontByName(req.query.name));
});

fontRouter.get("/all",function(req,res){
    res.send(controller.getAllFonts());
});

fontRouter.get("/history/:id",function(req,res){
    res.send(controller.getFontHistory(req.query.id));
});

fontRouter.get("/popular",function(req,res){
    res.send(controller.getMostPopular());
});

module.exports=fontRouter;