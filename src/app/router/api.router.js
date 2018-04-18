var express = require('express'),
    apiRouter = express.Router(),
    bodyParser = require('body-parser'),
    commentRouter = require('./comment.router.js'),
    fontRouter = require('./font.router.js');

apiRouter.use(bodyParser.json);
apiRouter.use(bodyParser.urlencoded({ extended: true })); 

apiRouter.use(function(req,res,next){
    console.log("incoming to api: " + req.url);
    next();
});

apiRouter.use('/font', fontRouter);
apiRouter.use('/comment',commentRouter);

module.exports = apiRouter;