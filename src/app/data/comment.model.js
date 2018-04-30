const conn = require("./db.js");

const   getBase =  "select public.user.email, username,comment_text,comment.comment_id,public.user.user_id, AVG(rating.rating) as \"rating\", count(rating.rating) as \"total_votes\" "+
"from public.comment join public.font using(font_id) join public.user using(user_id) left join rating ON comment.comment_id = rating.comment_id ",

    getFromNameQuery = getBase+" where public.user.username = $1 group by comment.comment_id, public.user.user_id;",

    getFromFontIdQuery =getBase+" where public.font.font_id = $1 group by comment.comment_id, public.user.user_id;",
    
        insertQuery="insert into public.comment (user_id,font_id,comment_text) values ($1,$2,$3) RETURNING comment_id;",
    getQuery = getBase + "where comment.comment_id = $1 group by comment.comment_id, public.user.user_id;";


function getFromUserName(uName){
    return conn.execute(getFromNameQuery,[uName]);
}

function getFromFontId(fid){
    return conn.execute(getFromFontIdQuery,[fid]);
}
function getFromId(id){
    return conn.execute(getQuery,[id]);
}
function insertComment(uid,fid,text){
    return conn.execute(insertQuery,[uid,fid,text]);
}

module.exports = {
    getFromUserName:getFromUserName,
    getFromFontId:getFromFontId,
    insertComment:insertComment,
    get:getFromId
}