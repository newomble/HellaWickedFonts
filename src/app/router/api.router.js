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

apiRouter.route("/reset/password").post(function(req,res){//Not sure where reset password input is from
    var uName = req.body.username;
    var newPwod = req.body.newpassword;
    var confirmdNewPw = req.body.repassword;

    if(newPwod == confirmdNewPw){
        controller.resetPass(confirmdNewPw, uName);
    }else{
        res.send("Please reconfirm new password");
    }
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
    console.log("signup hit")
    if(!uName || !pWord || !repWord || !fname || !lname || !email){
        console.log("missing")
        res.send("Missing Field");
    }else if( !pWord || pWord != repWord){
        console.log("pass mismatch")
        res.send("Passwords do not match");
    }else{
        console.log("signing up");
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

apiRouter.post("/user/edit/collection",function(req,res){
    if( !isLoggedIn(req) ){
        res.send("Must be logged in");
    } else if(!req.body.font_id){
        res.send("No font selected");
    }else if (req.body.is_fav != null){
        console.log(req.body.is_fav);
        if(req.body.is_fav == "true" || req.body.is_fav === true){
            controller.newCollection(req.session.user.user_id,req.body.font_id,res);
        } else if (req.body.is_fav == "false" || req.body.is_fav === false){
            controller.removeCollection(req.session.user.user_id,req.body.font_id,res);
        }else{
            res.send("Bad favorite value");
        }
    } else{
        res.send("Could not determine of adding or removing");
    }
})


apiRouter.post("/user/update/email",function(req,res){
    if(!req.body.email){
        res.send("Requires email.")
    }else if(isLoggedIn(req)){
        controller.updateEmail(req.body.email,req.session.user.user_id,res);
    }else{
        res.send("Are you logged in?");
    }
})
apiRouter.post("/user/update/name",function(req,res){
    if(!req.body.first_name || !req.body.last_name){
        res.send("Requires first name and last name.")
    }else if(isLoggedIn(req)){
        controller.updateName(req.body.first_name,req.body.last_name,req.session.user.username,res);
    }else{
        res.send("Are you logged in?");
    }
})
apiRouter.post("/user/update/username",function(req,res){
    if(!req.body.username){
        res.send("Requires username.")
    }else if(isLoggedIn(req)){
        controller.updateUsername(req.body.username,req.session.user.user_id,res);
    }else{
        res.send("Are you logged in?");
    }
})
apiRouter.post("/user/update/password",function(req,res){
    if(!req.body.password){
        res.send("Requires new password.")
    }else if(isLoggedIn(req)){
        controller.resetPass(req.body.password,req.session.user.username,res);
    }else{
        res.send("Are you logged in?");
    }
})
apiRouter.post("/user/update/all",function(req,res){
    var resString = {};
    var error = false;

    if(!isLoggedIn(req)){
        res.send("Must be logged in");
        return;
    }
    if(req.body.password){
        controller.resetPass(req.body.password,req.session.user.username);
        resString.password = true;     
    }
    if(req.body.username){
        controller.updateUsername(req.body.username,req.session.user.user_id);        
        resString.username = true;    
    }
    if(req.body.email){
        controller.updateEmail(req.body.email,req.session.user.user_id);           
        resString.email = true;  
    }
    if(req.body.first_name && req.body.last_name){
        controller.updateName(req.body.first_name,req.body.last_name,req.session.user.user_id);        
        resString.name = true;  
    }
    res.send(resString);
})

module.exports = apiRouter;

function isLoggedIn(req){
    return (req.session.loggedIn == true);
}