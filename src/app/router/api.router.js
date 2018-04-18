var express = require('express'),
    apiRouter = express.Router(),
    bodyParser = require('body-parser'),
    fontRouter = require('./font.router.js');

apiRouter.use(bodyParser.json);
apiRouter.use(bodyParser.urlencoded({ extended: true })); 

apiRouter.use(function(req,res,next){
    console.log("incoming to api: " + req.url);
    next();
});

apiRouter.use('/font', fontRouter);


module.exports = apiRouter;