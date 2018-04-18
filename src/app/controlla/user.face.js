var path = require('path'),
    basePath = path.dirname(require.main.filename),
    consts = basePath + "/api/lib/constants.js"; 


function login(uName,pword){//return uid

}
function userComments(uName){//all comments from user uName

}
function fontComments(fontId){//all comments for font

}
function newComment(uid,fid,text){//return bool

}
function newRating(uid,type,id,rating){//add rating to type (constant)

}
module.exports = {
    login:login,
    userComments:userComments,
    fontComments:fontComments,
    newComment:newComment,
    newRating:newRating
}