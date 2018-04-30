const conn = require("./db.js");

const getOneQuery = "select * from rating where rating_id = $1",
	getAllQuery = "select * from rating",
	updateQuery = "update rating set rating = $1::INT where rating_id = $2",
	hasRatedFontQuery = "select rating_id  from rating where font_id = $1 and user_id = $2",
	hasRatedCommentQuery = "select rating_id  from rating where comment_id = $1 and user_id = $2",
	deleteQuery = "delete from rating where rating_id = $1",
	addFontQuery = "Insert into rating (user_id,font_id,rating) VALUES ($1,$2,$3) RETURNING rating",
	addCommentQuery = "Insert into rating (user_id,comment_id,rating) VALUES ($1,$2,$3) RETURNING rating";

function getRating(id){
	return conn.execute(getOneQuery,[id]);
}
function hasRatedFont(fid,uid){
	return conn.execute(hasRatedFontQuery,[fid,uid]);
}
function hasRatedComment(cid,uid){
	return conn.execute(hasRatedCommentQuery,[cid,uid] );
}
function addFont(uid,id,rating){
	return conn.execute(addFontQuery,[uid,id,rating]);
}
function addComment(uid,id,rating){
	return conn.execute(addCommentQuery,[uid,id,rating]);
}
function update(rid,rating){
	return conn.execute(updateQuery, [rating,rid]);
}

module.exports = {
	get: getRating,
	addFont:addFont,
	addComment:addComment,
	hasRatedFont:hasRatedFont,
	hasRatedComment:hasRatedComment,
	update:update
}