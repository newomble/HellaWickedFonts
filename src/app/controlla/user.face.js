var usrModel = require(process.env.modelRoot+"user.model.js"),
    collModel = require(process.env.modelRoot+"user_font.model.js"),
    md5 = require("md5"),
    bCrypt = require('bcrypt-nodejs');

function login(uName,pword,res,req){
    var client = usrModel.getCredentials(uName);
    client(function(err,vals){
        if(err){
            dberr(err,res);
        }else{
            console.log(req.session);
            var user = vals.rows[0];
            if(user && user.password){   
                bCrypt.compare(pword,user.password,function(err,hashRes){
                    if(hashRes){
                        req.session.user = user;
                        req.session.loggedIn = true;
                        req.session.user.icon = makeGravLink(user.email);
                        res.send(true); 
                    } else {
                        res.send("Passwords did not match");
                    }
                });
            } else{
                res.send("Username not found");
            }
        } 
    })
}
function newCollection(uid,fontIdArr,res){
    fontIdArr.forEach(function(fid){
        var client = collModel.add(uid,fid);
        res.send(true);
    })
    return results;
}
function getCollections(uid,res){//all users collections
    var client = collModel.getFromUser(uid);
    client(function(err,vals){
        if(err){
            dberr(err,res);
        } else {
            res.send(vals.rows);
        }
    });
}
function getCollection(cid){//specific collection
    return false;
}
function newUser(uName,fName,lName,pWord,res){
    var salt =  bCrypt.genSaltSync(10);
    var pass = createHash(pWord,salt);

    var client = usrModel.addNewUser(uName,pass,fName,lName,salt);
    client(function(err,vals){
        if(err){
            dberr(err,res);
        } else {
            res.send(true);
        }
    })
}
function getUserData(userId,res){
    var client = usrModel.get(userId,res);
    client(function(err,vals){
        var fullRes = stripSensative(vals.rows[0]);
        if(fullRes){
            fullRes["icon_url"] = makeGravLink(fullRes.email);
            res.send(JSON.stringify(fullRes) );
        }else{
            res.send(false);
        }
	});
}
module.exports = {
    login:login,
    newCollection:newCollection,
    getCollection:getCollection,
    getCollections:getCollections,
    getUserData:getUserData,
    newUser:newUser
}

function stripSensative(res){
    delete res["password"];
    delete res["salt"];
    return res;
}
function makeGravLink(email){
    return process.env.icon_url+"avatar/"+md5((email.trim()).toLowerCase() );
}

function createHash(password,salt){
    return bCrypt.hashSync(password,salt, null);
};

function dberr(err,res){
    console.log(err);
    res.send("DB Error.");
}