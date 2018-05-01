/** 
 * Logic that relates to non user centric functionality
 */
var path = require('path'),
    basePath = path.dirname(require.main.filename),
    consts = require("../lib/constants.js"),
    comModel = require(process.env.modelRoot+"comment.model.js"),
    fontModel = require(process.env.modelRoot+"font.model.js"),
    md5 = require("md5"),
    utils = require("../lib/utils.js"),
    ratingModel = require(process.env.modelRoot+"rating.model.js"); 

function userComments(uName,res){//all comments from user uName
    var client = comModel.getFromUserName(uName);
    utils.sendRows(client,res);
}
function fontComments(fontId,res){//all comments for font
    var client = comModel.getFromFontId(fontId);
    utils.sendRows(client,res);
}
function getComment(commentId,res){
    var client = comModel.get(commentId);
    utils.sendRows(client,res);
}
function newComment(uid,fid,text,res){//return bool
    var client = comModel.insertComment(uid,fid,text);
    client(function(err,vals){
        if(err){
            utils.dberr(err,res);
            return;
        }
        if(vals.rows){
            var resId = vals.rows[0].comment_id;            
            var getClient = comModel.get(resId);
            utils.sendRows(getClient,res);
        } else {
            res.send(false);
        }
    })
}
function newRating(uid,type,id,rating,res){//add rating to type (constant)
    var client;
    if(type == consts.FONT ){
        var hasRatedClient = ratingModel.hasRatedFont(id,uid);
        hasRatedClient(function(err1,response){
            if(err1){
                utils.dberr(err1,res);
                return;
            }
            var client = null;
            if(response.rows.length < 1){//add
                client = ratingModel.addFont(uid,id,rating);
            }else{//update
                client = ratingModel.update(response.rows[0].rating_id,rating);
            }
            if(client){
                client(function(err,vals){
                    if(err){
                        utils.dberr(err,res);
                        return;
                    }
                    getFontById(id,res,uid);
                });
            }else{
                res.send("Something went wrong");
            }
            
        });
    } else if (type == consts.COMMENT){
        var hasRatedClient = ratingModel.hasRatedComment(id,uid);
        hasRatedClient(function(err1,response){
            if(err1){
                utils.dberr(err,res);
                return;
            }
            if(response.rows.length < 1){
                client = ratingModel.addComment(uid,id,rating);
            }else{//update
                client = ratingModel.update(response.rows[0].rating_id,rating);
            }
            if(client){
                client(function(err,vals){
                    if(err){console.log(err);res.send(false);return;}
                    getComment(id,res);
                });
            }else{
                res.send("Something went wrong");
            }
        })
    }else{
        res.send(false);
    }
}
function getFontById(fid,res,uid){
    var client =  fontModel.get(fid,uid);
    utils.sendRows(client,res);
}
function getFontByName(fName,res){
    var client =  fontModel.getByName(fName);
    utils.sendRows(client,res);    
}
function getAllFonts(res,uid){
    var client =  fontModel.getAll(uid);
    utils.sendRows(client,res);
}
function getMostPopular(res,uid){
    var client =  fontModel.getMostPopular(uid);
    utils.sendRows(client,res);
}
function getSuggestion(res){
    var client = fontModel.getSuggestion();
    utils.sendRows(client,res);
}
function searchFonts(txt, type,start,end,res,uid){
    var client = fontModel.search(type,txt,start,end,uid);
    utils.sendRows(client,res);
}
function searchUserCollection(uid, txt, type,start,end,res,myuid){
    var client = fontModel.searchInColl(uid,type,txt,start,end,myuid);
    utils.sendRows(client,res);
}
function getTrending(res,uid){
    var client = fontModel.getTrending(uid);
    utils.sendRows(client,res);
}
function getFontHistory(fid,res){
    var client =  fontModel.getHistory(fid);
    //utils.sendRows(client,res);
    //flip order for front end package. psql 'function' stored stamentes are a mystery to me
    client(function(err,vals){
        if(err){
            utils.dberr(err,res);
            return;
        }
        var temp = [];
        for (var i = vals.rows.length; i >0; i--){
            temp.push(vals.rows[i-1]);
        } 
        res.send(temp);
    });
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
    searchUserCollection:searchUserCollection,
    getTrending:getTrending
}

