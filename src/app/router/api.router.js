var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    bodyParser = require("body-parser"),
    controller = require(basePath + "/app/controlla/index.face.js"),
    consts = require(basePath+"/app/lib/constants.js"),
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
    var email = req.body.email;

    if(!uName || !pWord || !repWord || !fname || !lname || !email){
        res.send("Missing Field");
    }else if( !pWord || pWord != repWord){
        res.send("Passwords do not match");
    }else{
        controller.newUser(uName,fname,lname,pWord,email,res);
    }
});

apiRouter.post("/rate",function(req,res){
    if(!isLoggedIn(req)){
        res.send("Must be logged in.");
    } else if( !req.body.rating){
        res.send("Rating required");
    }else{
        var id = 0;
        var type = null;
        if(req.body.font_id){
            id = req.body.font_id;
            type = consts.FONT;
        } else if(req.body.comment_id){
            id = req.body.comment_id;
            type = consts.COMMENT;
        }
        if(type == null){
            res.send("Couldn't determine if comment or font rating");
        }else{
            controller.newRating(req.session.user.user_id,type,id,req.body.rating,res);
        }
    }
});

apiRouter.post("/comment",function(req,res){
    if( ! isLoggedIn(req) || !req.body.comment || !req.body.font_id ){
        res.send("Must be logged in and have a font and comment");
    }else{
        controller.newComment(req.session.user.user_id,req.body.font_id,req.body.comment,res);
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
        controller.searchFonts(txt, type, res);
    }

});

apiRouter.post("/font",function(req,res){
    if(req.body.id){
        controller.getFontById(req.body.id,res);
    }else{
        res.send("No id given");
    }
})

apiRouter.post("/search/users",function(req,res){
    var txt = req.body.search_string;
    if(!txt){
        res.send("Missing Search Text");
    } else {
        controller.searchUser(txt,res);
    }
});

apiRouter.post("/popular/fonts",function(req,res){
    controller.getMostPopular(res);
});

apiRouter.post("/suggested/fonts",function(req,res){
    controller.getSuggestion(res);
});
apiRouter.post("/get/comments",function(req,res){
    if(!req.body.font_id){
        res.send("Font id is required");
    }else{
        controller.fontComments(req.body.font_id,res);
    }
});
apiRouter.post("/font/history",function(req,res){
    if(!req.body.font_id){
        res.send("Font id is required");
    }else{
        controller.getFontHistory(req.body.font_id,res);
    }
})
apiRouter.post("/trending/fonts",function(req,res){
    controller.getTrending(res);
});
module.exports = apiRouter;

function isLoggedIn(req){
    req.session.user = {};
    req.session.user.user_id =1;
    return true;
    // return (req.session.loggedIn == true);
}