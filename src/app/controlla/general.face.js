var path = require('path'),
    basePath = path.dirname(require.main.filename),
    consts = basePath + "/api/lib/constants.js"; 

function userComments(uName){//all comments from user uName

}
function fontComments(fontId){//all comments for font

}
function newComment(uid,fid,text){//return bool

}
function newRating(uid,type,id,rating){//add rating to type (constant)

}
function getFontById(fid){//returns 1 font

}
function getFontByName(fName){//returns x fonts with exact name

}
function getAllFonts(){//like. all

}
function getFontHistory(fid){//pop history of font id

}
function getMostPopular(){//most popular x fonts

}

module.exports = {
    userComments:userComments,
    fontComments:fontComments,
    newComment:newComment,
    newRating:newRating,
    getFontByName:getFontByName,
    getFontById:getFontById,
    getAllFonts:getAllFonts,
    getFontHistory:getFontHistory,
    getMostPopular:getMostPopular
}