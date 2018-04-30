const conn = require("./db.js");

const getOneQuery = "select * from rating where rating_id = $1",
	getAllQuery = "select * from rating",
	updateQuery = "",
	deleteQuery = "delete from rating where rating_id = $1",
	addFontQuery = "Insert into rating (user_id,font_id,rating) VALUES ($1,$2,$3) RETURNING rating",
	addCommentQuery = "Insert into rating (user_id,comment_id,rating) VALUES ($1,$2,$3) RETURNING rating";

function getRating(id){
	return conn.execute(getOneQuery,[id]);
}

function addFont(uid,id,rating){
	return conn.execute(addFontQuery,[uid,id,rating]);
}

function addComment(uid,id,rating){
	return conn.execute(addCommentQuery,[uid,id,rating]);
}

module.exports = {
	get: getRating,
	addFont:addFont,
	addComment:addComment
}