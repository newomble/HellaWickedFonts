const conn = require("./db.js");

const fromuserQuery = "select * from sample_text where user_user_id = $1",
	fromfontQuery = "select * from sample_text where font_font_id = $1",
	updateQuery = "",
	deleteQuery = "";
function getFromUser(id){
	return conn.ex(fromuserQuery,[id]);
}

module.exports = {
	getFromUser: getFromUser
}