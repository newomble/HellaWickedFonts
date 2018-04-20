var usrModel = require("../data/user.model.js"),
    collModel = require("../data/user_font.model.js");


function login(uName,pword){//return uid
    user = usrModel.getCredentials(uName);
    if(user[0].password == pword){
        return user.id;
    }
    return false;
}
function newCollection(uid,fontIdArr){//return stuff
    results = {};
    fontIdArr.forEach(function(fid){
        if( !collModel.add(uid,fid)){
            results.failed.fontId = fid;
        }else{
            results.success.fontId = fid;
        }
    })
    return results;
}
function getCollections(uid){//all users collections
    return collModel.getFromUser(uid);
}
function getCollection(cid){//specific collection
    return false;
}
module.exports = {
    login:login,
    newCollection:newCollection,
    getCollection:getCollection,
    getCollections:getCollections
}