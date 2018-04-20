const conn = require("./db.js");

const getOneQuery = "select * from font where id = $1",
	getAllQuery = "",
	updateQuery = "",
	insertQuery = "insert into font (family, popularity, kind) values ($1, $2, $3)",
	deleteQuery = "",
	getByNameQuery = "",
	getPopularQuery = "";

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
