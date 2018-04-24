const conn = require("./db.js");

const getFromNameQuery = "",
    getFromFontIdQuery ="",
    insertQuery="insert into comment (comment_text) values ($1)";


function getFromUserName(uName){
    return conn.execute(getFromNameQuery,[uName]);
}

function getFromFontId(fid){
    return conn.execute(getFromFontIdQuery,[fid]);
}

function insertComment(uid,fid,text){
    return conn.execute(insertQuery,[uid,fid,text]);
}

module.exports = {
    getFromUserName:getFromUserName,
    getFromFontId:getFromFontId,
    insertComment:insertComment
}