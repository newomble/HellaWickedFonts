const conn = require("./db.js");

const getOneQuery = "select * from rating where rating_id = $1",
	getAllQuery = "",
	updateQuery = "",
	deleteQuery = "",
	addFontQuery = "";
function getRating(id){
	return conn.execute(getOneQuery,[id]);
}

function addFont(uid,id,rating){
	return conn.execute(addFontQuery,[uid,id,rating]);
}

function addComment(uid,id,rating){
	return conn.execute(addComment,[uid,id,rating]);
}

module.exports = {
	get: getRating,
	addFont:addFont,
	addComment:addComment
}