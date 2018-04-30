var express = require('express'),
    path = require('path'),
    basePath = path.dirname(require.main.filename),
    bodyParser = require("body-parser"),
    controller = require(basePath + "/app/controlla/index.face.js"),
    consts = require(basePath+"/app/lib/constants.js"),
    utils = require(basePath+"/app/lib/utils.js"),
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

apiRouter.route("/reset/password").post(function(req,res){
    var uName = req.body.username;
    var newPwod = req.body.newpassword;
    var confirmdNewPw = req.body.repassword;

    if(!utils.isString(uName) || !utils.isString(newPwod) || !utils.isString(confirmdNewPw)){
        res.send("Missing or bad field");
    }else{
        if(newPwod == confirmdNewPw){
            controller.resetPass(confirmdNewPw, uName,res);
        }else{
            res.send("Please reconfirm new password");
        }
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
    console.log("signup hit");
    if(utils.isString(uName) == false || utils.isString(pWord) == false || utils.isString(repWord) == false || utils.isString(fname) == false || 
        utils.isString(lname) == false || utils.isString(email) == false){
        console.log("missing")
        res.send("Missing or bad field");
    }else if( !pWord || pWord != repWord){
        console.log("pass mismatch")
        res.send("Passwords do not match");
    }else if(utils.isEmail(email) == false){
        console.log("email entered is not a valid email");
        res.send(email+" is not a valid email");
    }else if(!utils.isStringUnder45(uName)|| !utils.isStringUnder45(email) || 
            !utils.isStringUnder45(fname) || !utils.isStringUnder45(lname)){
        console.log("username, email, or first/last name over 45 chars");
        res.send("Your username, email, or first/lastname is over 45 characters long");
    }else{
        console.log("signing up");
        controller.newUser(uName,fname,lname,pWord,email,res,req);
    }
});

apiRouter.post("/rate",function(req,res){
    // if(!isLoggedIn(req)){
    //     res.send("Must be logged in.");
    // }else if(!utils.isNumeric(req.body.rating)){
    //     res.send("Missing or bad rating");
    // }else{
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
            controller.newRating(2,type,id,req.body.rating,res);
            // controller.newRating(req.session.user.user_id,type,id,req.body.rating,res);
        }
    // }
});

apiRouter.post("/comment",function(req,res){
    //TODO remove comments
    // if( ! isLoggedIn(req) || !req.body.comment || !utils.isNumeric(req.body.font_id) ){
    //     res.send("Must be logged in and have a font and comment");
    // }else{
        controller.newComment(2,req.body.font_id,req.body.comment,res);
    // }
});

apiRouter.post("/search/fonts",function(req,res){
    var txt = req.body.search_string;
    var uid = req.body.user_id;
    var type = req.body.type;
    
    var limitStart = req.body.limit_start;
    var limitEnd = req.body.limit_end;
    if(!limitStart){
        limitStart = 0;
    }
    if(!limitEnd){
        limitEnd = 25;
    }

    if(utils.isString(txt) == false && !(txt === "") ){
        res.send("Missing or bad search text");
    }else if(utils.isString(type) == false){
        res.send("Missing or bad type field");
    }else if(uid){
        var myuid = getUid(req);
        controller.searchUserCollection(uid, txt, type,limitStart,limitEnd, res,myuid);
    } else {
        var uid = getUid(req);
        controller.searchFonts(txt, type,limitStart,limitEnd, res,uid);
    }

});

apiRouter.post("/font",function(req,res){
    var uid = getUid(req);
    if(utils.isNumeric(req.body.id) ){
        controller.getFontById(req.body.id,res,uid);
    }else{
        console.log("Error with id in /font");
        res.send("No id given or bad id input");
    }
});

apiRouter.post("/search/users",function(req,res){
    var txt = req.body.search_string;
    if(!utils.isString(txt)){
        res.send("Missing or bad search text");
    } else {
        controller.searchUser(txt,res);
    }
});

apiRouter.post("/popular/fonts",function(req,res){
        var myuid = getUid(req);
        controller.getMostPopular(res,myuid);
});

apiRouter.post("/suggested/fonts",function(req,res){
    controller.getSuggestion(res);
});
apiRouter.post("/get/comments",function(req,res){
    if(!utils.isNumeric(req.body.font_id)){
        res.send("Font id is missing or bad font id value");
    }else{
        controller.fontComments(req.body.font_id,res);
    }
});
apiRouter.post("/font/history",function(req,res){
    if(!utils.isNumeric(req.body.font_id)){
        console.log("Error with font id in /font/history");
        res.send("Font id is required");
    }else{
        controller.getFontHistory(req.body.font_id,res);
    }
});
apiRouter.post("/trending/fonts",function(req,res){
        var myuid = getUid(req);
        controller.getTrending(res,myuid);
});

apiRouter.post("/user/edit/collection",function(req,res){
    if( !isLoggedIn(req) ){
        res.send("Must be logged in");
    } else if(!utils.isNumeric(req.body.font_id)){
        res.send("No font selected");
    }else if (req.body.is_fav != null){

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
});


apiRouter.post("/user/update/email",function(req,res){
    if(!utils.isEmail(req.body.email)){
        res.send("Requires email.")
    }else if(isLoggedIn(req)){
        controller.updateEmail(req.body.email,req.session.user.user_id,res);
    }else{
        res.send("Are you logged in?");
    }
});
apiRouter.post("/user/update/name",function(req,res){
    if(!utils.isString(req.body.first_name) || !utils.isString(req.body.last_name)){
        res.send("Requires first name and last name.");
    }else if(!utils.isStringUnder45(req.body.first_name) || !utils.isStringUnder45(req.body.last_name)){
        res.send("First and last name need to be under 45 characters");
    }else if(isLoggedIn(req)){
        controller.updateName(req.body.first_name,req.body.last_name,req.session.user.username,res);
    }else{
        res.send("Are you logged in?");
    }
});
apiRouter.post("/user/update/username",function(req,res){
    if(!utils.isString(req.body.username)){
        res.send("Requires username.");
    }else if(!utils.isStringUnder45(req.body.username)){
        res.send("Username needs to be under 45 characters");
    }else if(isLoggedIn(req)){
        controller.updateUsername(req.body.username,req.session.user.user_id,res);
    }else{
        res.send("Are you logged in?");
    }
});
apiRouter.post("/user/update/password",function(req,res){
    if(!utils.isString(req.body.password)){
        res.send("Requires new password or bad password input");
    }else if(isLoggedIn(req)){
        controller.resetPass(req.body.password,req.session.user.username,res);
    }else{
        res.send("Are you logged in?");
    }
});
apiRouter.post("/user/update/all",function(req,res){
    var resString = {};
    var error = false;

    if(!isLoggedIn(req)){
        res.send("Must be logged in");
        return;
    }
    if(utils.isString(req.body.password)){
        controller.resetPass(req.body.password,req.session.user.username);
        resString.password = true;     
    }
    if(utils.isString(req.body.username)){
        controller.updateUsername(req.body.username,req.session.user.user_id);        
        resString.username = req.body.username;    
    }
    if(utils.isString(req.body.email)){
        if(utils.isEmail(req.body.email)){
            controller.updateEmail(req.body.email,req.session.user.user_id);           
            resString.email = req.body.email; 
        } 
    }
    if(utils.isString(req.body.first_name) && utils.isString(req.body.last_name)){
        if(utils.isStringUnder45(req.body.first_name) && utils.isStringUnder45(req.body.last_name)){
            controller.updateName(req.body.first_name,req.body.last_name,req.session.user.user_id);        
            resString.first_name = req.body.first_name;
            resString.last_name = req.body.last_name;
        }
    }
    res.send(resString);
});

module.exports = apiRouter;

function isLoggedIn(req){
    return (req.session.loggedIn == true);
}

function getUid(req){
    if(req.session.user && req.session.user.user_id){
        return req.session.user.user_id;
    }
    return null
}
