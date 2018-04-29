const conn = require("./db.js");

const fromuserQuery = "select * from public.font join public.user_font on public.user_font.font_font_id = public.font.font_id where user_user_id = $1",
	fromfontQuery = "select * from sample_text where font_font_id = $1",
	updateQuery = "",
	deleteQuery = "",
	addQuery = "insert into user_font (user_user_id,font_font_id) VALUES ($1,$2)",
	removeQuery = "delete from user_font where user_user_id = $1 and  font_font_id = $2";
function getFromUser(id){
	return conn.execute(fromuserQuery,[id]);
}

function add(uid,fid){
	return conn.execute(addQuery,[uid,fid]);
}

function search(uid,txt){
	// return conn.execute(searchQuery,[uid,txt]);
}
function remove(uid,fid){
	return conn.execute(removeQuery,[uid,fid]);
}

module.exports = {
	getFromUser: getFromUser,
	add:add,
	remove:remove
}