var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    controller = basePath + "/app/controlla/font.face.js",
    fontRouter = express.Router();


fontRouter.get('/id/:id',function(req,res){
    controller.getFontById(req.query.id,res);
});

fontRouter.get('/name/:name',function(req,res){
    controller.getFontByName(req.query.name,res);
});

fontRouter.get("/all",function(req,res){
    controller.getAllFonts(res);
});

fontRouter.get("/history/:id",function(req,res){
    controller.getFontHistory(req.query.id,res);
});

fontRouter.get("/popular",function(req,res){
    controller.getMostPopular(res);
});

module.exports=fontRouter;