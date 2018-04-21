var usrModel = require(process.env.modelRoot+"user.model.js"),
    collModel = require(process.env.modelRoot+"user_font.model.js");


function login(uName,pword){//return uid
    user = usrModel.getCredentials(uName);
    if(user.password == pword){
        return user.id;
    }
    return false;
}
function newCollection(uid,fontIdArr){//return stuff
    results = {failed:{},success:{}};
    fontIdArr.forEach(function(fid){
        if( !collModel.add(uid,fid)){
            results.failed.font_id = fid;
        }else{
            results.success.font_id = fid;
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