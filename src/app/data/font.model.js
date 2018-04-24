const conn = require("./db.js");

const getOneQuery = "select * from font where id = $1",
	getAllQuery = "select * from font",
	updateQuery = "",
	insertQuery = "insert into font (family, popularity, kind) values ($1, $2, $3)",
	deleteQuery = "delete from font where font_id = $1",
	getByNameQuery = "select family from font where family = $1",
	getPopularQuery = "select * from font order by popularity asc";

function getFont(id){
	return conn.execute(getOneQuery,[id]);
}

function insertFonts(id1, id2, id3){
	return conn.execute(insertQuery, [id1, id2, id3])
}

function getByName(name){
	return conn.execute(getByNameQuery,[name]);
}

function getAll(){
	return conn.execute(getAllQuery,null);
}

function getHistory(fid){
	//TODO think we forgot in the db model
	return false;
}
function getMostPopular(){
	return conn.execute(getPopularQuery,null);
}
module.exports = {
	get: getFont,
	getByName:getByName,
	getAll:getAll,
	insert: insertFonts,
	getHistory:getHistory
}
