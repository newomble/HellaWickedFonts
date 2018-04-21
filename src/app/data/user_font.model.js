const conn = require("./db.js");

const fromuserQuery = "select * from sample_text where user_user_id = $1",
	fromfontQuery = "select * from sample_text where font_font_id = $1",
	updateQuery = "",
	deleteQuery = "",
	addQuery = "";
function getFromUser(id){
	return conn.execute(fromuserQuery,[id]);
}

function add(uid,fid){
	return conn.execute(addQuery,[fid]);
}

module.exports = {
	getFromUser: getFromUser,
	add:add
}