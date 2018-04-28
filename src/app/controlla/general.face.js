var path = require('path'),
    basePath = path.dirname(require.main.filename),
    consts = require("../lib/constants.js"),
    comModel = require(process.env.modelRoot+"comment.model.js"),
    fontModel = require(process.env.modelRoot+"font.model.js"),
    ratingModel = require(process.env.modelRoot+"rating.model.js"); 

function userComments(uName,res){//all comments from user uName
    var client = comModel.getFromUserName(uName);
    sendRows(client,res);
}
function fontComments(fontId,res){//all comments for font
    var client = comModel.getFromFontId(fontId);
    sendRows(client,res);
}
function newComment(uid,fid,text,res){//return bool
    var client = comModel.insertComment(uid,fid,text);
    insertResponse(client,res);
}
function newRating(uid,type,id,rating,res){//add rating to type (constant)
    var client;
    if(type == consts.FONT ){
        client = ratingModel.addFont(uid,id,rating);
    } else if (type == consts.COMMENT){
        client = ratingModel.addComment(uid,id,rating);
    }
    if(client){
        insertResponse(client,res);
    } else {
        res.send(false);
    }
}
function getFontById(fid,res){
    var client =  fontModel.get(fid);
    sendRows(client,res);
}
function getFontByName(fName,res){
    var client =  fontModel.getByName(fName);
    sendRows(client,res);    
}
function getAllFonts(res){
    var client =  fontModel.getAll();
    sendRows(client,res);
}
function getFontHistory(fid,res){
    var client =  fontModel.getHistory(fid);
    sendRows(client,res);
}
function getMostPopular(res){
    var client =  fontModel.getPopular();
    sendRows(client,res);
}
function getSuggestion(res){
    var client = fontModel.getSuggestion();
    sendRows(client,res);
}
function searchFonts(txt, type,res){
    var client = fontModel.search(type,txt);
    sendRows(client,res);
}
function searchUserCollection(uid, txt, type,res){
    var client = fontModel.searchInColl(uid,type,txt);
    sendRows(client,res);
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
    getMostPopular:getMostPopular,
    getSuggestion:getSuggestion,
    searchFonts:searchFonts,
    searchUserCollection:searchUserCollection
}


function insertResponse(client,res){
    client( function(err,vals ){
        if(err){
            console.log(err);
            res.send(false);
        }else{
            res.send(true);
        }
    });
}

function sendRows(client,res){
    client(function(err,vals){
        if(err){
            console.log(err);
            res.send(false);
        }else{
            res.send(vals.rows);
        }
    });
}