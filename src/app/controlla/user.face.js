/** 
 * User centric functions
 */
var usrModel = require(process.env.modelRoot+"user.model.js"),
    collModel = require(process.env.modelRoot+"user_font.model.js"),
    utils = require("../lib/utils.js"),
    bCrypt = require('bcrypt-nodejs');

function login(uName,pword,res,req){
    var client = usrModel.getCredentials(uName);
    client(function(err,vals){
        if(err){
            utils.dberr(err,res);
        }else{
            var user = vals.rows[0];
            if(user && user.password){   
                bCrypt.compare(pword,user.password,function(err,hashRes){
                    if(hashRes){//passwords match
                        req.session.user = user;
                        req.session.loggedIn = true;
                        req.session.user.icon = utils.makeGravLink(user.email);
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

function newCollection(uid,fid,res){
    var client = collModel.add(uid,fid);
    client(function(err,vals){
        if(err){utils.dberr(err,res); return;}
        res.send(true);
    })
}
function removeCollection(uid,fid,res){
    var client = collModel.remove(uid,fid);
    client(function(err,vals){
        if(err){utils.dberr(err,res); return;}
        res.send(true);
    })
}
function getCollections(uid,res){
    var client = collModel.getFromUser(uid);
    client(function(err,vals){
        if(err){
            utils.dberr(err,res);
        } else {
            res.send(vals.rows);
        }
    });
}

function newUser(uName,fName,lName,pWord,email,res,req){
    var salt =  bCrypt.genSaltSync(10);
    var pass = utils.createHash(pWord,salt);
    var uNameClient = usrModel.getCredentials(uName)
    uNameClient(function(err1,response){//check username
        if(err1){utils.dberr(err1,response);return;}
        if(response.rows.length > 0){
            res.send("Username is taken");
        }else{
            var client = usrModel.addNewUser(uName,pass,fName,lName,salt,email);
            client(function(err,vals){//save new user
                if(err){
                    utils.dberr(err,res);
                } else {//redir to login on success
                    res.send(true);
                    // res.redirect("/login"); - bad idea w/templatejs - moved to ajax resolve on front end
                }
            });
        }
    })
    
}
function getUserData(userId,res){
    var client = usrModel.get(userId);
    client(function(err,vals){
        var fullRes = utils.stripSensative(vals.rows[0]);
        if(fullRes){
            fullRes["icon_url"] = utils.makeGravLink(fullRes.email);
            res.send(JSON.stringify(fullRes) );
        }else{
            res.send(false);
        }
	});
}

function searchUser(txt,res){
    var client = usrModel.search(txt);
    client(function(err,vals){
        if(err){
            utils.dberr(err,res);
        }else{
            vals.rows.forEach(item => {
                item.user_icon = utils.makeGravLink(item.email);
            });

            res.send(vals.rows);
        }
    });
}

function resetPass(newPwd, uName,res){
    var salt =  bCrypt.genSaltSync(10);
    var pass = utils.createHash(newPwd,salt);
    
    var client = usrModel.resetPass(pass, uName);
    if(!res){
        utils.noResponse(client);
    }else{
        client(function(err,vals){
            if(err){
                utils.dberr(err,res);
            }else{
                res.send(true);
            }
        })
    }
}

function updateUsername(newUsername,uid){
    var client = usrModel.updateUsername(newUsername,uid);
    utils.noResponse(client)
}
function updateName(first_name,last_name,uid){
    var client = usrModel.updateName(first_name,last_name,uid);
    utils.noResponse(client)
}
function updateEmail(email,uid){
    var client = usrModel.updateEmail(email,uid);
    utils.noResponse(client)
}

module.exports = {
    login:login,
    newCollection:newCollection,
    getCollections:getCollections,
    getUserData:getUserData,
    newUser:newUser,
    resetPass: resetPass,
    searchUser:searchUser,
    removeCollection:removeCollection,
    updateUsername:updateUsername,
    updateName:updateName,
    updateEmail:updateEmail
}