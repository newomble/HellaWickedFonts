var path = require('path'),
    basePath = path.dirname(require.main.filename),
    consts = require("../lib/constants.js"),
    comModel = require(process.env.modelRoot+"comment.model.js"),
    fontModel = require(process.env.modelRoot+"font.model.js"),
    md5 = require("md5"),
    ratingModel = require(process.env.modelRoot+"rating.model.js"); 

function userComments(uName,res){//all comments from user uName
    var client = comModel.getFromUserName(uName);
    sendRows(client,res);
}
function fontComments(fontId,res){//all comments for font
    var client = comModel.getFromFontId(fontId);
    sendRows(client,res);
}
function getComment(commentId,res){
    var client = comModel.get(commentId);
    sendRows(client,res);
}
function newComment(uid,fid,text,res){//return bool
    var client = comModel.insertComment(uid,fid,text);
    client(function(err,vals){
        if(vals.rows){
            var resId = vals.rows[0].comment_id;            
            var getClient = comModel.get(resId);
            sendRows(getClient,res);
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
            if(err1){console.log(err); res.send(false);return;}
            if(response.rows.length < 1){
                client = ratingModel.addFont(uid,id,rating);
                client(function(err,vals){
                    if(err){console.log(err);res.send(false);return;}
                    getFontById(id,res,uid);
                });
            }else{
                res.send("Already Rated");
            }
            
        });
    } else if (type == consts.COMMENT){
        var hasRatedClient = ratingModel.hasRatedComment(id,uid);
        hasRatedClient(function(err1,response){
            if(err1){console.log(err); res.send(false);return;}
            if(response.rows.length < 1){
                client = ratingModel.addComment(uid,id,rating);
                client(function(err,vals){
                    if(err){console.log(err);res.send(false);return;}
                    getComment(id,res);
                });
            }else{
                res.send("Already Rated");
            }
        })
    }else{
        res.send(false);
    }
}
function getFontById(fid,res,uid){
    var client =  fontModel.get(fid,uid);
    sendRows(client,res);
}
function getFontByName(fName,res){
    var client =  fontModel.getByName(fName);
    sendRows(client,res);    
}
function getAllFonts(res,uid){
    var client =  fontModel.getAll(uid);
    sendRows(client,res);
}
function getMostPopular(res,uid){
    var client =  fontModel.getMostPopular(uid);
    sendRows(client,res);
}
function getSuggestion(res){
    var client = fontModel.getSuggestion();
    sendRows(client,res);
}
function searchFonts(txt, type,start,end,res,uid){
    var client = fontModel.search(type,txt,start,end,uid);
    sendRows(client,res);
}
function searchUserCollection(uid, txt, type,start,end,res,myuid){
    var client = fontModel.searchInColl(uid,type,txt,start,end,myuid);
    sendRows(client,res);
}
function getTrending(res,uid){
    var client = fontModel.getTrending(uid);
    sendRows(client,res);
}
function getFontHistory(fid,res){
    var client =  fontModel.getHistory(fid);
    //sendRows(client,res);
    /**
     * Reversing the order last minute at front end request.
     * TODO: move it into the sql
     */
    client(function(err,vals){
        if(err){console.log(err); res.send(false);return;}
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


function insertResponse(client,res){
    client( function(err,vals ){
        if(err){
            console.log(err);
            res.send(false);
        }else{
            if( vals && vals.rows && vals.rows[0] ){
                res.send(vals.rows[0]);
            }else{
                res.send(true);
            }
        }
    });
}

function sendRows(client,res){
    client(function(err,vals){
        if(err){
            console.log(err);
            res.send(false);
        }else{
            vals.rows.forEach(element => {
                if(element.email){
                    element.icon = makeGravLink(element.email);
                }
            });
            res.send(vals.rows);
        }
    });
}

function makeGravLink(email){
    return process.env.icon_url+"avatar/"+md5((email.trim()).toLowerCase() );
}
