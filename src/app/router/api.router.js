var express = require('express')
var apiRouter = express.Router();

apiRouter.use(function(req,res,next){
    console.log("incoming to api: " + req.url);
    next();
});

apiRouter.get('',function(req,res){

});

module.exports = apiRouter;